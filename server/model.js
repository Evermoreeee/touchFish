const mongoose = require('mongoose')
const DB_URL = 'mongodb://39.100.115.217:27017/xyio'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function () {
    console.log('mongodb connected successfully')
})


const models = {
	// user:{
	// 	'user':{'type':String,'require':true},
	// 	'pwd':{'type':String,'require':true},
	// },
	userInfor:{
		'userName':{'type':String,'require':true},
		'userPwd':{'type':String,'require':true},
	    'userPhone':{'type':String,'require':true},
	    'userHobby':{'type':String,'require':true},
	},
	baiduNew:{
		'title':{'type':String,'require':true},
		'href':{'type':String,'require':true},
	},
	// chat:{
	// 	'chatid':{'type':String,'require':true},
	// 	'from':{'type':String,'require':true},
	// 	'to':{'type':String,'require':true},
	// 	'read':{'type':Boolean,'default':false},
	// 	'content':{'type':String,'require':true,'default':''},
	// 	'create_time':{'type':Number,'default':Date.now}
	// }
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}