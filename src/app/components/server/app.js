const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

const url = 'mongodb://localhost/blogDb';
const User = require('./model/user');

app.post('/api/user/login', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        console.log('connected successfully, username is ',req.body.username,' password is ',req.body.password);
    });
})
 
app.get('/api/user/login', (req, res) => {
    res.send('Hello World!')
})
 
app.listen(3000, () => console.log('blog server running on port 3000!'))