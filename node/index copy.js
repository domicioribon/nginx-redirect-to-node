const express = require('express')

async function main(){
    const app = express()
    const port = 3000
    const config = {
        host: 'db',
        user: 'root',
        password: 'root',
        database:'nodedb'
    };
    const mysql = require('mysql')
    const connection = mysql.createConnection(config)

    let sql = "CREATE TABLE IF NOT EXISTS `nodedb`.`people` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(255) NULL,PRIMARY KEY (`id`));"
    connection.query(sql)

    sql = `INSERT INTO people(name) values('Domicio')`
    connection.query(sql)

    sql = `SELECT * FROM people`
    let finalResult = []
    await connection.query(sql, function (err, result) {
        if (err) throw err;
        // console.log(result);
        this.finalResult = result
    })
    // console.log(finalResult);

    connection.end()


    app.get('/', (req,res) => {
        res.send('<h1>Full Cycle</h1>')
    })

    app.listen(port, ()=> {
        console.log('Rodando na porta ' + port)
    })
}

main()