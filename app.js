
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

// middlewares
app.use(cors({
    origin: "*"
}))

app.use(express.static('public'));

// Routes
const catRouter = require('./routes/catRouter');
app.use('/', catRouter);

app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado`);
});