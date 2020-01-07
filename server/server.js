const express = require('express')
var bodyParser = require('body-parser')
const app = express()

//允许跨域
let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST')
  res.header('Access-Control-Allow-Headers', 'content-type')
  next()
}

app.use(allowCrossDomain)

app.use(bodyParser.json())   
app.use(bodyParser.urlencoded({extended: false})); 

const userRouter = require('./user')

app.use(userRouter)

app.listen(8080, function() {
  console.log('node app start at port 8080')
})