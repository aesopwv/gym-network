const express = require('express');
const path = require('path');
const _mysql = require('mysql2');
const _port = 8000;

const _connection = _mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password123',
        database : 'gymnw_db'
    });

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, `src`)));
app.use(express.static(path.join(__dirname, `public`)));
app.use(express.static(path.join(__dirname, `test`)))

app.get(`/`, (pRequest, pResponse) =>
{
    pResponse.sendFile(path.join(__dirname, `public`, `/index.html`));
});

app.get(`/home`, (pRequest, pResponse) =>
{
    pResponse.sendFile(path.join(__dirname, `public`, `home.html`));
});

app.get(`/test`, (pRequest, pResponse) =>
{
    pResponse.sendFile(path.join(__dirname, `test`, `test.html`));
});

app.post(`/test-submit`, (pRequest, pResponse) =>
{
    const {input} = pRequest.body;

    const tmpSql = 'INSERT INTO test (text) VALUES (?)';
    const tmpValues = [input];

    _connection.query(tmpSql, tmpValues, (pError, result) => 
    {
        if (pError)
        {
            console.error(`Error inserting data:`, pError);
            return pResponse.status(500).send(`Error inserting data`);
        }

        console.log(`Data inserted:`, result);
        pResponse.status(201).send(`Data added successfully`);
    });
});

// app.post(`/signup-submit`, (pRequest, pResponse) =>
// {
//     const {username, email, password} = pRequest.body;

//     const tmpSql = 'INSERT INTO users (username, user_email, user_password) VALUES (?, ?, ?)';
//     const tmpValues = [username, email, password];

//     _connection.query(tmpSql, tmpValues, (pError, result) =>
//     {
//         if (pError)
//         {
//             console.error(`Error inserting data:`, pError);
//             return pResponse.status(500).send(`Error inserting data`);
//         }
//         console.log(`Data inserted:`, result);
//         pResponse.status(201).send(`Data added successfully`);
//     })
// });

app.listen(_port, () =>
{
    console.log(`The server is now running on port ${_port}`);
});