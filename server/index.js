require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const prisma = require("./prisma/prisma");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require("multer");
const upload = multer({ dest: "files/" });

// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/files', express.static('files'));

app.use('/api', require('./routes'));

app.get('/', (req, res) => {
  res.send('Backend Setup Done!');
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on ${PORT}`);
});