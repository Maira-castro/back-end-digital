//conexao com o banco
const app = require('./app')

const port = 3000

app.listen(port,()=>{
    console.log(`servidor rodadando no endereço http://localhost:${port}`);
    
})