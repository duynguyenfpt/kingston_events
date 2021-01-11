const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/', (req, res) => {
    res.send(`Listening on ${ PORT }`);
})

module.exports = app;