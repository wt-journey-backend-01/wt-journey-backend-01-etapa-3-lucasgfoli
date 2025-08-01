const express = require('express')
const app = express()
const PORT = 3000
const agentesRoutes = require('./routes/agentesRoutes.js')
const casosRoutes = require('./routes/casosRoutes.js')

app.use(express.json())
app.use('/agentes', agentesRoutes)
app.use('/casos', casosRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})