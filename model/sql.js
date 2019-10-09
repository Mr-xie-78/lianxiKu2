const mysql = require('mysql')

var connection = mysql.createConnection({
                  host:'127.0.0.1',
                  user:'root',
                  port:3306,
                  password:'root',
                  database:'albx_38'
               })

module.exports = {
    connection
}