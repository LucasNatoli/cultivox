const express = require('express')
const cors = require('cors');


const app = express()
const PORT = 4000 //process.env.IBALAT_PORT;

app.use(cors({ origin: '*' }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.status(200).send("Listo perro")
})
app.listen(PORT, () => {
  console.log('🚀 app listening on port:', PORT)
})