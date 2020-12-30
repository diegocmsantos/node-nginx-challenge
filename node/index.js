const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const insert = `INSERT INTO people(name) values ('Diego')`
connection.query(insert)
//connection.end()

app.get('/', (req, res) => {
    connection.query('SELECT * FROM people ORDER BY id desc', function(err,rows) {
        if(err) {
            console.log(err)
        } else {
            console.log(rows[0])
            html = '<h1>Full Cycle1</h1><ul>'
            rows.forEach(row => {
                html += '<li>' + row.name + '</li>'
            });
            html += '</ul>'
            res.send(html)
        }
    });
})

app.listen(port, () => {
    console.log('Running on port', port)
})

