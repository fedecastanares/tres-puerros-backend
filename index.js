console.log('Levantando server');

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

let dataBaseConnectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xut0w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json({ extended: true}));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


const checkIfTheUserHasCredentials = require('./middlewares/checkIfTheUserHasCredentials');
const checkIfTheUserIsAdmin = require('./middlewares/checkIfTheUserIsAdmin.js');

app.get('/', (req, res) => {res.send('El servidor esta corriendo')});

app.post('/login', require('./controllers/users/login'));

app.post('/register', checkIfTheUserHasCredentials, checkIfTheUserIsAdmin, require('./controllers/users/register'));

app.get('/items',  require('./controllers/items/get'));

app.post('/new-item', checkIfTheUserHasCredentials, checkIfTheUserIsAdmin, require('./controllers/items/add'));

app.post('/modify-item', checkIfTheUserHasCredentials, checkIfTheUserIsAdmin, require('./controllers/items/modify'));

app.post('/new-box', checkIfTheUserHasCredentials, checkIfTheUserIsAdmin, require('./controllers/box/new'));

app.get('/boxes', require('./controllers/box/get'));

app.delete('/delete-item/:id', checkIfTheUserHasCredentials, checkIfTheUserIsAdmin, require('./controllers/items/delete'));

app.post('/add-item-inner-box',  checkIfTheUserHasCredentials, checkIfTheUserIsAdmin, require('./controllers/box/addItem'))

app.post('/remove-item-inner-box',  checkIfTheUserHasCredentials, checkIfTheUserIsAdmin, require('./controllers/box/removeitem'))

app.delete('/delete-box/:id', checkIfTheUserHasCredentials, checkIfTheUserIsAdmin, require('./controllers/box/delete'));

app.post('/add-order',  require('./controllers/orders/add'))

app.get('/orders', checkIfTheUserHasCredentials, checkIfTheUserIsAdmin, require('./controllers/orders/get'));

app.get('/order/:id', checkIfTheUserHasCredentials, checkIfTheUserIsAdmin, require('./controllers/orders/getOrderByID'));

mongoose.connect(dataBaseConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (error) => {
        if (error) {
            console.error('No fue posible conectarse a la base de datos', error)
        } else {
            // Comenzar a escuchar por conexiones
            app.listen(port, '0.0.0.0', () =>
                console.log(`;) Servidor corriendo en el puerto: ${process.env.PORT}`)
            )
        }
    });