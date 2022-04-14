const express = require('express')
const mysql = require(`mysql-await`);

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

async function main(){
    const app = express()
    const port = 3000
    
    // conecta ao banco
    const connection = mysql.createConnection(config)

    // cria tabela se não existe
    const createTableQuery = "CREATE TABLE IF NOT EXISTS `nodedb`.`people` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(255) NULL,PRIMARY KEY (`id`));"
    let result = await connection.awaitQuery(createTableQuery)
    // console.log(result);

    // fecha conexão
    connection.awaitEnd();


    let htmlHeader = `<h1>Full Cycle</h1>`
    htmlHeader = htmlHeader + `<a href="./">add registro</a>`
    htmlHeader = htmlHeader + `<br><a href="./clearbd">Limpar bd</a>`

    // GET
    app.get('/', async (req, res) => {
        // conecta ao banco
        const connection = mysql.createConnection(config)

        // insere usuário
        const min = 0;
        const max = 4;
        const randomNumber = Math.floor(Math.random() * (max - min)) + min;
        // console.log(randomNumber);
        let name = ['Domício', 'Wesley', 'Rafael', 'Gabriel'][randomNumber]
        const insertQuery = `INSERT INTO people(name) values('${name}')`
        let result = await connection.awaitQuery(insertQuery)
        const insertId = result.insertId
        // console.log(result.insertId);

        // select
        const selectAllQuery = `SELECT * FROM people`
        result = await connection.awaitQuery(selectAllQuery)
        connection.awaitEnd();

        // console.log(result);
        // imprime usuário caso busca maior que 0
        if(result.length > 0 ){
            // console.log(result);
            let html = htmlHeader + `<h2>Registros:</h2>`
            result.forEach(element => {
                html = html + `<br> ID: ${element.id} | Name: ${element.name}`
            });
            res.send(html)
            return;
        }
        res.send('<h1>Full Cycle</h1>')
    })

    // GET
    app.get('/clearbd', async (req, res) => {
        // conecta ao banco
        const connection = mysql.createConnection(config)

        // insere usuário
        const insertQuery = `TRUNCATE nodedb.people`;
        let result = await connection.awaitQuery(insertQuery)
        
        let html = htmlHeader + `<h2>Banco limpo</h2>`
        res.send(html)
    })

    app.listen(port, ()=> {
        console.log('Rodando node na porta ' + port)
    })
}

main()