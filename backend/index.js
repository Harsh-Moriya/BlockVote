const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 6001;
const port = 5000;
const dotenv = require('dotenv');
const cors = require('cors');

const app = express()
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server connected to ${PORT}`));
}).catch((err)=> console.log(`${err} did not connect`))

// app.get('/', (req, res) => {
//     res.send('hello world')
// })

app.use('/api/auth', require('./routes/auth'));
app.use('/api/elections', require('./routes/elections'));

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
})