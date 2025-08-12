const agentesRepository = require('../repositories/agentesRepository')
const handlerError = require('../utils/errorHandler')

async function getAllAgentes(req, res) {
    const agentes = agentesRepository.findAll()

    res.status(200).json(agentes)
}

async function getAgenteById(req, res) {
    const { id } = req.params
    const agente = await agentesRepository.findById(id)

    if (!agente)
        return res.status(404).json({ message: 'Agente não encontrado.' })
    else
        res.status(200).json(agente)
}

async function createAgente(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body

    if (!nome || !dataDeIncorporacao || !cargo)
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' })
    else if (!validarData(dataDeIncorporacao))
        return res.status(400).json({ message: 'Data de incorporação inválida. Use o formato YYYY-MM-DD e não informe datas futuras.' })

    const newAgente = { nome, dataDeIncorporacao, cargo }
    const agenteCreated = await agentesRepository.create(newAgente)

    const agenteRetornado = await agentesRepository.findById(agenteCriado.id)

    res.status(201).json(agenteRetornado)
}

async function updateAgente(req, res) {
    const { id } = req.params
    const { nome, dataDeIncorporacao, cargo, id: idBody } = req.body

    if (idBody && idBody !== id)
        return res.status(400).json({ message: "O campo 'id' não pode ser alterado." });
    else if (!nome || !dataDeIncorporacao || !cargo)
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    else if (!validarData(dataDeIncorporacao))
        return res.status(400).json({ message: 'Data de incorporação inválida. Use o formato YYYY-MM-DD e não informe datas futuras.' });
    else {
        const agenteAtualizado = await agentesRepository.update(id, { nome, dataDeIncorporacao, cargo: cargo.toLowerCase() });
        if (!agenteAtualizado)
            return res.status(404).json({ message: 'Agente não encontrado.' });
        res.status(200).json(agenteAtualizado);
    }
}

async function patchAgente(req, res) {
        const { id } = req.params
        const updates = req.body
        const camposValidos = ['nome', 'dataDeIncorporacao', 'cargo']

        if ('id' in updates)
            return res.status(400).json({ message: "O campo 'id' não pode ser alterado." })

        const camposAtualizaveis = Object.keys(updates).filter(campo => camposValidos.includes(campo))

        if (updates.dataDeIncorporacao && !validarData(updates.dataDeIncorporacao))
            return res.status(400).json({ message: 'Data de incorporação inválida. Use o formato YYYY-MM-DD e não informe datas futuras.' })
        else if (camposAtualizaveis.length === 0)
            return res.status(400).json({ message: 'Deve conter pelo menos um campo válido para atualização.' })
        else {
        const patchedAgente = await agentesRepository.patchById(id, updates);
        const agenteReturned = agentesRepository.findById(patchedAgente.id)

        res.status(200).json(agenteReturned);
    }
}

async function deleteAgente(req, res) {
        const { id } = req.params
        const agente = await agentesRepository.findById(id)

        if (!agente)
            return res.status(404).json({ message: 'Agente não encontrado.' });
        else {
        await agentesRepository.deleteById(id);
        res.status(204).send();
}}

function validarData(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/

    if (!regex.test(dateString)) return false

    const date = new Date(dateString)
    const today = new Date()

    if (isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dateString)
        return false

    if (date > today) return false

    return true
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    patchAgente,
    deleteAgente
}
