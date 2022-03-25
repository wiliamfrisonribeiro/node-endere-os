const express = require('express')
const cors = require('cors')
const { pool } = require('./config')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


const controllerEstado = require('./controllers/estados')
const controllerCidade = require('./controllers/cidades')



app
    .route('/estados')
    .get(controllerEstado.getEstados)
    .post(controllerEstado.addEstado)
    .put(controllerEstado.updateEstado)


app
    .route('/estados/:codigo')
    .get(controllerEstado.getEstadoPorCodigo)
    .delete(controllerEstado.deleteEstado)


app
    .route('/cidades')
    .get(controllerCidade.getCidades)
    .post(controllerCidade.addCidade)
    .put(controllerCidade.updateCidade)

app
    .route('/carros/:codigo')
    .get(controllerCidade.getCidadePorId)
    .delete(controllerCidade.deleteCidade)


app.listen(process.env.PORT || 3002, () => {
    console.log(`Servidor rodando`)
})