const express = require('express')
const Router = express.Router()
const model = require('./model')

// const log4js = require('log4js');
// log4js.configure({
//     appenders: {
//         out: {type: 'stdout'},
//         app: {type: 'file', filename: 'app.log'},
//         every: {type: 'dateFile', filename: 'every.log'}
//     },
//     categories: {
//         nice: {appenders: ['out', 'app'], level: 'debug'},
//         cheese: {appenders: ['out', 'every'], level: 'info'}
//     }
// });

// let logger = log4js.getLogger('cheese');
const User = model.getModel('user')

Router.post('/login',function(req,res){
	const userbody = req.body
	User.create(userbody, function (err, data) {
		if(err){
			return res.json({code:200,data:data,messge:' 猪册失败'})
		}else {
			return res.json({code:200,data:data,messge:' 猪册成功'})
		}
	});
})


Router.get('/login',function(req,res){
	// const {user,pwd} = req.body
	console.log(req)
	// res.send('hello world');
	res.send('im the about page!'); 
})

module.exports = Router