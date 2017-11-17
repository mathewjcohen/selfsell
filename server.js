const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();

app.use(compression());
app.use(express.static(__dirname + "/client/static"));

app.set("views", path.join(__dirname, "./client/views"));
app.set('view engine', 'ejs');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000);