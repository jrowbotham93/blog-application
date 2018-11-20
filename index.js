const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const Sequelize = require('sequelize');
const pg = require('pg');
const connection = new Sequelize('postgresql://admin:admin@localhost:5432/blogApp');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')


//app.get('/test', (req, res) => res.send({data: 'this is my data'}));

const register = connection.define('register', {
    email: Sequelize.STRING,
    username: Sequelize.STRING, 
    password: Sequelize.STRING,
})


var user = connection.define('user', {
    username: Sequelize.STRING, 
    password: Sequelize.STRING,
    list: Sequelize.ARRAY(Sequelize.TEXT)
})

user.hasMany(register)
register.belongsTo(user)


// 'true' deletes the DB everytime
connection.sync(
    {force: true}
)

app.get('/', function (req, res){
    res.render('index')    
})

app.get('/feed', function (req,res){
    res.render('feed')  
})

app.get('/register', function (req,res){
    res.render('register') 
})

// renders feed and selects * from table messages table in postgres


// app.get('/feed', function (req, res){
//     messages.findAll().then(function (messages) {
//         res.render('feed', {result: messages});
//     })
// })


// // posts from input form on index to my DB, also redirects user to feed page where they can see all posts. (additional .then function important as otherwise you must refresh to see new updates)

app.post('/feed', function (req, res){

        // connection.sync().then(function (){
        //       messages.create({
       
       let inputs = {name: req.body.name,
                    message: req.body.message}
        
        console.log(inputs)
        res.render('feed', {inputs:inputs});
        
       
    })

// registration page post username and password 

    app.post('/register', function (req, res){
        user.findOne({where:{name: req.body.register}}).then((reg=>{
            if(!user){
//create new entry in DB
                user.create({
                    username: req.body.username,
                    password: req.body.password
                }).then((newGroup) => {
                    newGroup.createUser({
username: req.body.username,
password: reg.body.password,
email: req.body.email
                   })
                })
                }else{
                console.log(reg)
                Users.create({
                    username:
                    password:
                    email:
                })
//login

            }
        }))
        // connection.sync().then(function (){
        //       messages.create({
       
    //    let newUser = {username: req.body.username,
    //                 password: req.body.password}
        
        // console.log(inputs)
        // res.render('feed', {inputs:inputs});
        
       
    })




app.listen(port, () => console.log(`Example app listening on port ${port}!`))