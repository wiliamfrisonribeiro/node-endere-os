
const { pool } = require("../config");



const getEstados = (request, response) => {
    pool.query("select * from estados order by codigo", (error, results) => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro ao recuperar os estados: ' + error
            });
        }
        response.status(200).json(results.rows)
    })
}


module.exports.getEstados = getEstados

const addEstado = (request, response) => {
    const { nome, uf } = request.body

    pool.query(
        'INSERT INTO estados (nome, uf) values ($1, $2)',
        [nome, uf],
        (error) => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro ao inserir o estado: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Estado criado.' })
        }
    )
}

module.exports.addEstado = addEstado


const updateEstado = (request, response) => {
    const { codigo, nome, uf } = request.body

    pool.query(
        'update estados set nome = $1, uf = $2 where codigo = $3',
        [nome, uf, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro ao atualizar o estado: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Estado atualizado.' })
        }
    )
}
module.exports.updateEstado = updateEstado


const deleteEstado = (request, response, next) => {
    const codigo = parseInt(request.params.id)
    pool.query(
        'DELETE from estados where codigo=$1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Não foi possivel remover o estado'
                });
            }
            response.status(201).json({
                status: 'success',
                message: 'Estado removido com sucesso'
            })
        },
    )
}
module.exports.deleteEstado = deleteEstado

const getEstadoPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'SELECT * from estado where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar o estado: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}
module.exports.getEstadoPorCodigo = getEstadoPorCodigo
