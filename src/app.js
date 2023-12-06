const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./userController');
const orderController = require('./orderController');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use('/users', userController);
app.use('/orders', orderController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});