require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const agentesRoutes = require('./routes/agentesRoutes.js')
const casosRoutes = require('./routes/casosRoutes.js')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./docs/swagger.js')

app.use(express.json())
app.use('/agentes', agentesRoutes)
app.use('/casos', casosRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, '0.0.0.0', ()=> {
    console.log(`🚀Servidor rodando na porta ${PORT}`)
})