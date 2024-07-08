'use strict';

const env = process.env;
const jwtSecret = env.USRACCNT_JWT_SECRET;
const END_POINT = '/v1/accounts'
const credential = require('credential')
const jwt = require('jsonwebtoken');
const msgs = require('./account.messages')

const checkToken = require('../middleware').checkToken;
const validateRequestEmail = require('../middleware').validateRequestEmail;
const validateRequestPassword = require('../middleware').validateRequestPassword;

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    var pw = credential()
    pw.hash(password, (err, hash) => {
      if (err) {
        reject(err)
      } else {
        resolve(hash)
      }
    })
  })
}

function verifyPassword(hash, password) {
  return new Promise(function (resolve, reject) {
    var pw = credential()
    pw.verify(hash, password, (err, isValid) => {
      if (err) {
        reject(err)
      } else {
        resolve(isValid)
      }
    })
  })
}

function findByEmail(email, account) {
  return new Promise(function (resolve, reject) {
    account.findOne({
      where: { email: email }
    }).then(
      account => { resolve(account) },
      err => { reject(err) }
    )
  })
}

function findById(id, account) {
  return new Promise((resolve, reject) => {
    account.findOne({
      attributes: ['fullname', 'phone', 'email'],
      where: { id: id }
    }).then(
      account => { resolve(account) },
      err => { reject(err) }
    )
  })
}

function isAdmin(id, account) {

  return new Promise((resolve, reject) => {
    account.findOne({
      attributes: ['isAdmin'],
      where: { id: id }
    }).then(
      account => { resolve(account.isAdmin) },
      err => { reject(err) }
    )
  })

}

function userInfo(id, fullname, group) {
  let token = jwt.sign(
    { id: id },
    jwtSecret,
    { expiresIn: '24h' }
  );

  return {
    token: token,
    fullname: fullname,
    appRoutes: group.appRoutes.map(route => { return route.route })
  }
}

module.exports = (app, models) => {
  app.get(END_POINT + '/vendor-token', (req, res) => {
    const fs = require('fs');
    const path = require("path");
    const jsonString = fs.readFileSync(path.resolve(__dirname, "token_contabilium.json"));
    const jsonObject = JSON.parse(jsonString);
    res.status(200).send(jsonObject)
  })

  app.get(END_POINT + '/vendor-token-bio', (req, res) => {
    const fs = require('fs');
    const path = require("path");
    const jsonString = fs.readFileSync(path.resolve(__dirname, "token_contabilium_bio.json"));
    const jsonObject = JSON.parse(jsonString);
    res.status(200).send(jsonObject)
  })

  app.get(END_POINT + '/status', (req, res) => {
    res.status(200).send({
      serverTime: Math.floor(Date.now() / 1000),
      version: '1.0',
      endPoint: END_POINT
    })
  })

  app.post(END_POINT + '/register', (req, res) => {
    var fullname = req.body.fullname;
    var phone = req.body.phone;
    var email = req.body.email;
    findByEmail(email, models.account).then(
      account => {
        if (account) {
          // El email existe
          res.status(401).send() //TODO: Investigar que codigo de error se devuelve por account publicada
        } else {
          // se puede crear la account
          hashPassword(req.body.password).then(
            (hash) => {
              var password = hash;
              models.account.create({ fullname, phone, email, password })
                .then(res.status(201).send({ fullname, phone, email }))
            },
            (err) => {
              res.status(500).send
            }
          )
        }
      }
    )
  })

  app.post(END_POINT + '/login',
    (req, res, next) => validateRequestEmail(req, res, next),
    (req, res, next) => validateRequestPassword(req, res, next),
    (req, res) => {
      var email = req.body.email;
      var password = req.body.password;

      models.account.findOne({ where: { email } })
        .then(
          account => {
            verifyPassword(account.get('password'), password)
              .then(
                result => {
                  if (result) {
                    models.group.findOne({
                      where: { id: account.userGroupId },
                      include: { model: models.appRoute }
                    })
                      .then(
                        group => {
                          res.status(200).send(
                            userInfo(account.id,
                              account.fullname,
                              group
                            )
                          )
                        })
                      .catch(
                        err => {
                          console.log('error', err)
                          res.status(500).send()
                        }
                      ) // DB Error al obtener data del grupo      
                  }
                }
              )
              .catch(
                (err) => {
                  console.log('error', err)
                  res.status(403).send(msgs.InvalidCredentials())
                }
              ) // No coincide el password        
          }
        )
        .catch(() => res.status(500).send()) // DB Error alobtener data de account    

    })

  app.get(END_POINT + '/check-token',
    (req, res, next) => { checkToken(req, res, next) },
    (req, res) => {
      res.status(200).send([{
        serverTime: Math.floor(Date.now() / 1000),
        iat: req.decoded.iat,
        exp: req.decoded.exp
      }])
    })

  app.get(END_POINT + '/account-info',
    (req, res, next) => { checkToken(req, res, next) },
    (req, res) => {
      var account_id = req.decoded.id;
      findById(account_id, models.account).then(
        account => {
          res.status(200).send(account)
        },
        err => {
          res.status(500).send()
        }
      )
    }
  )

  app.get(END_POINT + '/users',
    (req, res, next) => { checkToken(req, res, next) },
    (req, res) => {
      isAdmin(req.decoded.id, models.account)
        .then(
          isAdmin => {
            if (isAdmin === 1) {
              models.account.findAll({ attributes: ['id', 'fullname', 'phone', 'email', 'state', 'isAdmin'] })
                .then(
                  users => { res.status(200).send(users) },
                  err => { res.status(500).send() }
                )
            } else {
              return res.status(400).send(msgs.InvalidCredentials());
            }
          },
          err => { res.status(500).send() }
        )

    }
  )

  app.put(END_POINT + '/account-info',
    (req, res, next) => { checkToken(req, res, next) },
    (req, res) => {
      var account_id = req.decoded.id;
      var updateValues = { fullname: req.body.fullname, phone: req.body.phone, email: req.body.email }
      models.account.update(
        updateValues,
        { returning: true, where: { id: account_id } }
      ).then(
        () => {
          res.status(200).send(updateValues)
        }
      ).catch(
        err => { res.status(500).send() }
      )
    }
  )

}
