const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('http://localhost:8080', (req, res) => {
    res.send(req)
})

app.listen(8080, () => {
    console.log('server listening on port 8080')
})