const db = require("../db/db")

async function findAll() {
  return await db("agentes").select("*")
}

async function findById(id) {
  return await db("agentes").where({ id }).first()
}

async function create(agente) {
  await db("agentes").insert(agente)
  return agente
}

async function update(id, updateAgente) {
  const count = await db("agentes").where({ id }).update(updateAgente)
  if (count === 0) return undefined
  return findById(id)
}

async function patchById(id, updateAgente) {
  const rollBacks = await db("agentes").where({ id }).update(updateAgente)
  return rollBacks ? findById(id) : undefined
}

async function deleteById(id) {
  const agente = await findById(id)
  if (!agente) return undefined

  await db("agentes").where({ id }).del()
  return true
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  patchById,
  deleteById,
}