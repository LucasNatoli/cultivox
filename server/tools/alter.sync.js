const models = require('../models')

models.sequelize.sync({alter: true}).then(() => {
    console.log('models alter ok')
    return;
})
