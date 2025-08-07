const db = require('../db/db')

async function findAll(){
    return await db('agentes').select('*')
}

async function findById(id) {
    const agente = await db('agentes').where({id}).first()
    return agente || null
}

async function create({nome, dataDeIncorporacao, cargo}){
    const [id] = await db('agentes').insert({
        nome,
        dataDeIncorporacao,
        cargo
    }).returning('id')

    return findById(id)
}

async function update(id, { nome, dataDeIncorporacao, cargo }) {
    const rowsAffected = await db('agentes')
        .where({id})
        .update({nome, dataDeIncorporacao, cargo})

    return rowsAffected ? findById(id) : null
}

async function patchById(id, updates) {
    delete updates.id

    const rowsAffected = await db('agentes')
        .where({id})
        .update(updates)

    return rowsAffected ? findById(id) : null 
}

async function deleteById(id) {
    const agente = await findById(id)

    if(!agente) return null

    await db('agentes').where({ id }).del()
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