const express = require('express')
const Router = express.Router()
const model = require('./model')
var request = require('request');

const UserInfor = model.getModel('userInfor')

const BaiduNew = model.getModel('baiduNew')

Router.post('/regiser',function(req,res){
	const {userName,userPwd}  = req.body
	const userbody = req.body
	UserInfor.find({userName:userName} , function(err, data){
		if(!err && data.length > 0){
			return res.json({code:33,data:data,messge:'账号已存在'})
		}else{
			UserInfor.create(userbody, function (err, data) {
				if(err){
					return res.json({code:0,data:data,messge:' 猪册失败'})
				}else {
					return res.json({code:0,data:data,messge:' 猪册成功'})
				}
			});
		}
	})
	
})

Router.post('/login',function(req,res){
	// const {user,pwd} = req.body
	// console.log(req)

	const {userName,userPwd}  = req.body
	UserInfor.find({userName:userName},function (err, data) {
		console.log(data)
		if(err || data.length == 0){
			return res.json({code:33,data:data,messge:'查不到用户名'})
		}else{
			if(userPwd == data[0].userPwd){
				return res.json({code:0,data:data,messge:'登录成功'})
			}else{
				return res.json({code:33,data:data,messge:'密码错误'})
			}
		}
	})
	// res.send('hello world');
})

Router.get('/newlist',function(req,res) {
	// const {user,pwd} = req.body
	// console.log(req)
	// BaiduNew.find({},function(err, data){
	// 	if(err || data.length == 0 ){
	// 		return res.json({code:33,data:data,messge:'获取列表为空'})
	// 	}else{
	// 		return res.json({code:0,data:data,messge:'获取列表成功'})
	// 	}
	// })
	request('https://api.myjson.com/bins/1bnk2m', function (error, response,data) {
		if (!error ) {
			return res.json({code:0,data:data,messge:'获取列表成功'})
		}else {	
	 		return res.json({code:33,data:data,messge:'获取列表失败'})
		}
	});
	 
}) 

function _Proxy(url){
	request(url, function (error, response,data) {
		if (!error ) {
			return data
		}else {	
			console.log(error);
		}
	});
}


module.exports = Router