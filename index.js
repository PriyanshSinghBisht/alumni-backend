require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./Database/db');

const PORT = process.env.PORT || 4001;
const app = express();

const authRouter = require('./routes/auth');

connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.listen(PORT,()=> console.log('listening on port', PORT));

app.get('/', (req,res)=>{
    res.json('priyansh server')
})

app.get('/auth/register', (req,res)=>{
    console.log(req.body)
    res.json(req.body);
})
app.use('/auth', authRouter);


