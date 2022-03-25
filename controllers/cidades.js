const { pool } = require("../config");



const getCidades = (request, response) => {
    pool.query("select l.codigo as codigo, l.nome as nome, l.descricao as descricao, \
    l.estado as estado, e.nome as estado_nome \
    from cidades l \
    join estados e on e.codigo = l.estado order by l.codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os estados: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getCidades = getCidades

const addCidade = (request, response) => {
    const { nome , descricao, estado } = request.body
    pool.query(
        'insert into cidades ( nome , descricao, estado ) values ($1, $2, $3)',
        [ nome , descricao, estado ],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir a cidade: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Cidade criado.' })
        }        
    )
}
module.exports.addCidade = addCidade

const updateCidade = (request, response) => {
    const { codigo, nome , descricao, estado } = request.body

    pool.query(
        'update cidades set nome = $1, descricao = $2, estado = $3 where codigo = $4',
        [nome , descricao, estado, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar a cidade: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Cidade atualizado.' })
        }        
    )
}

module.exports.updateCidade = updateCidade;

const deleteCidade = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from cidades where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover a cidade: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'cidade removido.' })
        }        
    )
}

module.exports.deleteCidade = deleteCidade;

const getCidadePorId = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select l.codigo as codigo, l.nome as nome, l.descricao as descricao, \
        l.estado as estado, e.nome as estado_nome \
        from cidades l \
        join estados e on e.codigo = l.estado where l.codigo = $1 order by l.codigo ',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar o carro: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getCidadePorId = getCidadePorId;






