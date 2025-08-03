const knex = require('../db/db')

async function findAll(){
    return await knex('agentes').select('*')
}

async function findById(id) {
    const agente = await knex('agentes').where({id}).first()
    return agente || null
}

async function create({nome, dataDeIncorporacao, cargo}){
    const [id] = await knex('agentes').insert({
        nome,
        dataDeIncorporacao,
        cargo
    }).returning('id')

    return findById(id)
}

async function update(id, { nome, dataDeIncorporacao, cargo }) {
    const rowsAffected = await knex('agentes')
        .where({id})
        .update({nome, dataDeIncorporacao, cargo})

    return rowsAffected ? findById(id) : null
}

async function patchById(id, updates) {
    delete updates.id

    const rowsAffected = await knex('agentes')
        .where({id})
        .update(updates)

    return rowsAffected ? findById(id) : null 
}

async function deleteById(id) {
    const agente = await findById(id)

    if(!agente) return null

    await knex('agentes').where({ id }).del()
    return agente
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    patchById,
    deleteById
}