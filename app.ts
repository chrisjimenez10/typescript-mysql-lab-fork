// Connection to the MySql server
import * as mysql from "mysql2";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cratose@41795',
    database: 'Customers',
});

// connection.connect(() => {
//     console.log(`Conencted to the MySql server`);
// });

connection.query('SELECT * FROM customers', (err, results) => {
    console.log(results);
});

connection.end();