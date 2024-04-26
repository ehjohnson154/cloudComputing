const mySQLPool = require('./lib/mysqlpool');
const express = require('express');
const mysqlPool = require('./mysqlpool');

const app = express();

app.use(express.json());

async function getExampleCount() {
    const [ results ] = await mysqlPool.query(
        "SELECT COUNT(*) AS count FROM example"
    );

    return results[0].count;
}

app.get('/count', (req, res) => {
    const count = getExampleCount();
res.send(`Count is: ${count}`)
})

app.get('/', (req, res) => {
    res.send("hello, world!");
    console.log(mysqlPool);
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})

//has to await, thus has to be async
async function init(){
    const [ results ] = await mysqlPool.query(
        `CREATE TABLE IF NOT EXISTS example (
            id MEDIUMINT NOT NULL AUTOINCREMENT,
            VALUE Int,
            PRIMARY KEY(id),
            INDEX idx_value (value)
            )` );
    await mysqlPool.query("INSERT INTO example (value) VALUES (3490)");
}

//running as a function due to await stuff, easier to do it in function
init();