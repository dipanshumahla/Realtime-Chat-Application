const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 4001;

app.use(cors());

const server = app.listen(port,()=>{
    console.clear();
    console.log(`Server Started at port ${port}`);
});

const socket = require('./helpers/socket');
new socket(server);