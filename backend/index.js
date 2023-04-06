const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express()
dotenv.config();

const PORT = process.env.PORT || 6001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log('Server Connected');
}).catch((err)=> console.log(`${err} did not connect`))

app.use('/api/auth', require('./routes/auth'));
app.use('/api/elections', require('./routes/elections'));

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
})