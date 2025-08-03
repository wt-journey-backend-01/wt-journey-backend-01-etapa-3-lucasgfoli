/**
 * @swagger
 * tags:
 *   name: Agentes
 *   description: Endpoints para gerenciamento de agentes
 */

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Retorna todos os agentes
 *     tags: [Agentes]
 *     parameters:
 *       - in: query
 *         name: cargo
 *         schema:
 *           type: string
 *         description: Filtrar agentes pelo cargo
 *       - in: query
 *         name: dataDeIncorporacao
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar pela data de incorporação (YYYY-MM-DD)
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [nome, dataDeIncorporacao, cargo]
 *         description: Campo usado para ordenação
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Ordem da ordenação (ascendente ou descendente)
 *     responses:
 *       200:
 *         description: Lista de agentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agente'
 * 
 *   post:
 *     summary: Cadastra um novo agente
 *     tags: [Agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgenteInput'
 *     responses:
 *       201:
 *         description: Agente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 */

/**
 * @swagger
 * /agentes/{id}:
 *   get:
 *     summary: Retorna um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do agente
 *     responses:
 *       200:
 *         description: Dados do agente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       404:
 *         description: Agente não encontrado
 * 
 *   put:
 *     summary: Atualiza um agente pelo ID (substituição total)
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do agente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgenteInput'
 *     responses:
 *       200:
 *         description: Agente atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       404:
 *         description: Agente não encontrado
 * 
 *   patch:
 *     summary: Atualiza parcialmente um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do agente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               dataDeIncorporacao:
 *                 type: string
 *                 format: date
 *               cargo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agente atualizado parcialmente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       400:
 *         description: Erro na validação dos dados
 *       404:
 *         description: Agente não encontrado
 * 
 *   delete:
 *     summary: Remove um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do agente
 *     responses:
 *       204:
 *         description: Agente removido com sucesso
 *       404:
 *         description: Agente não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Agente:
 *       type: object
 *       required:
 *         - id
 *         - nome
 *         - dataDeIncorporacao
 *         - cargo
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID do agente
 *         nome:
 *           type: string
 *           description: Nome do agente
 *         dataDeIncorporacao:
 *           type: string
 *           format: date
 *           description: Data de incorporação no serviço
 *         cargo:
 *           type: string
 *           description: Cargo do agente (ex: delegado, investigador)
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         nome: "Maria Silva"
 *         dataDeIncorporacao: "2019-05-15"
 *         cargo: "investigador"
 * 
 *     AgenteInput:
 *       type: object
 *       required:
 *         - nome
 *         - dataDeIncorporacao
 *         - cargo
 *       properties:
 *         nome:
 *           type: string
 *         dataDeIncorporacao:
 *           type: string
 *           format: date
 *         cargo:
 *           type: string
 *       example:
 *         nome: "Maria Silva"
 *         dataDeIncorporacao: "2019-05-15"
 *         cargo: "investigador"
 */

const express = require('express')
const router = express.Router()
const casosController = require('../controllers/casosController.js')

router.get('/', casosController.getAllCasos)
router.get('/:id', casosController.getSpecificCase)
router.post('/', casosController.createCase)
router.put('/:id', casosController.updateCase)
router.patch('/:id', casosController.patchCase)
router.delete('/:id', casosController.deleteCase)

module.exports = router
