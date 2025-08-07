const db = require('../db/db')

async function findAll(){
    return await db('casos').select('*')
}

async function findById(id) {
    const caso = await db('casos').where({id}).first()
    return caso || null
}

async function create({ titulo, descricao, status, agente_id }) {
    const [id] = await db('casos').insert({
        titulo,
        descricao,
        status,
        agente_id
    }).returning('id')

    return findById(id)
}

async function update(id, { titulo, descricao, status, agente_id }) {
    const rowsAffected = await db('casos')
        .where({id})
        .update({ titulo, descricao, status, agente_id })

    return rowsAffected ? findById(id) : null
}

async function patchById(id, updates) {
    delete updates.id

    const rowsAffected = await db('casos')
        .where({id})
        .update(updates)

    return rowsAffected ? findById(id) : null
}

async function deleteById(id) {
    const caso = await findById(id)

    if(!caso) return null

    await db('casos').where({ id }).del()
    return caso
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    patchById,
    deleteById
}
