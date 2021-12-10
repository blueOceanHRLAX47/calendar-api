const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(cors());

const { sequelize } = require('../db/models');

sequelize.sync({ force: false });

app.get('/', (req, res) => {
  res.send('Hello World').status(200);
})

app.listen(3000, () => {
  console.log('listening on port 3000');
});