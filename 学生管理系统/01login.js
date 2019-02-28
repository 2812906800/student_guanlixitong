//1,导入express模块
const express=require('express');
// 导入body-parser模块
const  bodyParser = require('body-parser');
//导入mysql模块
const mysql=require("mysql");
// 模板引擎
const ejs = require('ejs');
//2，创建一个web应用
const app=express();

//接收post数据
app.use(bodyParser.urlencoded({
    extended: true
}));//接收from-data类型数据
app.use(bodyParser.json());  //接收json格式的数据
//连接数据库
const mydb = mysql.createConnection({
    user: 'root',
    password: '123',
    host: 'localhost',
    database: 'nodeserver',
    port: 3306
});
mydb.connect();

//模块引擎设置
app.engine('html', ejs.renderFile);  //自定义模板引擎html
app.set('views', 'myviews'); //模板文件所在的路径
app.set('view engine', 'html');



//各种路由
app.get("/",(req,res)=>{
	res.send("首页");
});
app.post("/login",(req,res)=>{
	//提取传入进来的post数据
	let mydata=req.body;
	//查询数据库中的数据记录
	mydb.query("select * from admin where username=?",[mydata.username],(err,result)=>{
		//检查账号是否存在
		if(!result.length){
			res.send({r:"username_not_exist"});
			return;
		}
		//检查密码是否正确
		if(result[0].pwd!=mydata.pwd){
			res.send({r:"pwd_err"});
		}
		//登录成功
		res.json({r:"ok"});
		
	});
});

//登录成功路由
//个人中心
app.get("/success",(req,res)=>{
	//模块引擎
	res.render("success");
});
//添加班级页面
app.get("/addclass",(req,res)=>{
	//模块引擎
	res.render("addclass");
});
app.post("/addclass",(req,res)=>{
	let mydata=req.body;
	mydb.query("insert into class(cname,addtime) value(?,now())",[mydata.cname],(err,result)=>{
		res.send('ok');
			
	});
});
//班级管理页面//展示班级列表
app.get("/class",(req,res)=>{
	//到数据库中查询数据
	let sql="select * from class where test=1";
	//搜索栏获取关键字
	let kw=req.query.keywords;
	if(kw){
		sql+=" and cname like '%"+kw+"%'";
	}else {
		kw = "";
	}
	mydb.query(sql,(err,result)=>{
		res.render("class",{clist:result,keywords:kw});
	});
});
//删除班级路由
app.get("/delc",(req,res)=>{
	let cid=req.query.cid;
	mydb.query("update class set test=2 where cid=?",cid,(err,result)=>{
		if(!err){
			res.json({r:"successed"});
		}
	});
});
//修改班级路由
app.get("/updateclass",(req,res)=>{
	//到数据库中获取原始的数据
	let mydata=req.query;
	mydb.query("select * from class  where cid=?",mydata.cid,(err,result)=>{
		res.render("updateclass",result[0]);
			
	});
});
app.post("/updateclass",(req,res)=>{
	//保存数据到数据库中
	let mydata=req.body;
	mydb.query("update class set cname=? where cid=?",[mydata.cname,mydata.cid],(err,result)=>{
		res.send('ok');
			
	});
});
// 子路由：miniApp
// app.use("/student",require("./router/student"));

//4,静态资源托管
app.use(express.static(__dirname + "/static"));
//3,服务器监听端口
app.listen(4000,()=>{
	console.log("4000...");
});