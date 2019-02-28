const express =require("express");
// const bodyParser=require("body-parser");
// const mysql = require("mysql");
const ejs=require("ejs");
const app=express();

//1、esj的方法
// app.get("/ejs",(req,res)=>{
// 	ejs.renderFile(
// 		__dirname+"/view/my.html",{
// 			username:"小米",
// 			age:20,
// 			sex:'男',
// 			info:"前端工程师",
// 			other1:[1,2,3,4,5]
// 		},
// 		(err,str)=>{
// 			res.send(str);
// 		});
// });
// 


//2、将ejs引入到express里面去
app.engine("html",ejs.renderFile);//定义模板引擎，自定义后缀名是HTML
app.set("views","myviews");
app.set("view engine","html");
app.get("/my",(req,res)=>{
	res.render("my",{username:"小青"})
})






app.use(express.static(__dirname+"/static"));
//服务器监听4000端口
app.listen(4000,()=>{
	console.log("4000...");
});