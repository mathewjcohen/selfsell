const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for sending json
app.use(express.static(path.join(__dirname, './public/dist')));

app.listen(8000);