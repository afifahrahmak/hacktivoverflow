const http = require('http')
const app = require('../app')
const port = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(port, _ => console.log('overflow is flowing on port ', port))