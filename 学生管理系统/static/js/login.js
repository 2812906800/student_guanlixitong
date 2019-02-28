window.onload=function(){
	adminlogin();//管理员登录，自调用
}

//管理员登录
function adminlogin(){
	let button=document.querySelector("button");
	button.onclick=function(){
		let errnum=0;
		//获取数据并检查
		let username =document.querySelector("input[name='username']");//属性选择器
		let u_val=username.value;
		let pwd =document.querySelector("input[name='pwd']");//属性选择器
		let p_val=pwd.value;
		if(u_val==""){
			username.parentNode.nextElementSibling.innerHTML="*必填";
			username.focus();
			errnum++;
		}else{
			username.parentNode.nextElementSibling.innerHTML="";
		}
		if(p_val==""){
			pwd.parentNode.nextElementSibling.innerHTML="*必填";
			pwd.focus();
			errnum++;
		}else{
			pwd.parentNode.nextElementSibling.innerHTML="";
		}
		//把数据提交到服务器  前提：数据填写完整
		if(!errnum){
			//发起Ajax请求
			let xhr=new XMLHttpRequest();
			xhr.open('post','/login');
			//设置请求头
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			//发送数据到服务器,es6里面的字符串模板，可以随意换行
			xhr.send(`username=${u_val}&pwd=${p_val}`);
			//状态事件监听并接收响应数据
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					let result=xhr.responseText;//send过来的内容，就是xhr.responseText；
					//如果接收的是字符串类型，需要转换成对象
					result=JSON.parse(result);
					if(result.r == 'username_not_exist'){
						username.parentElement.nextElementSibling.innerHTML = '*账号不存在';
						username.focus();
					}else if(result.r == 'pwd_err'){
						pwd.parentElement.nextElementSibling.innerHTML = '*密码错误';
						pwd.focus();
					}else if(result.r == 'ok'){
						window.location.href = '/success';
					}else{
						alert('未知错误，刷新后操作');
					}
					
				}
			}
			
		}
		
		
	}
	
	
}