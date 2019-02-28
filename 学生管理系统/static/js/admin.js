window.onload = function() {
	let layer = layui.layer;
	updateclass();
	addclass();
	delclass();
}
function updateclass(){
	let btn = document.querySelector(".myupdateclass");
		btn && (btn.onclick = function() { //判断btn存在后，才执行事件
			//获取数据并检查//获取要修改的信息的cid,
			let cid = document.querySelector("input[name='cid']").value;
			//获取输入框的值
			let cname = document.querySelector("input[name='cname']");
			let c_val = cname.value;
			if (c_val == "") {
				layer.msg("班级名称必填");
				cname.focus();
				return false;
			}
	
			//通过ajax传送数据给服务器
			axios.post('/updateclass', {
					cid:cid,
					cname: c_val
				})
				.then(function(response) {
					console.log(response);
					if (response.data == "ok") {
						window.location.href = "/class";
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		});
}
function addclass() {
	let btn = document.querySelector(".myaddclass");
	btn && (btn.onclick = function() { //判断btn存在后，才执行事件
		//获取数据并检查
		let cname = document.querySelector("input[name='cname']");
		let c_val = cname.value;
		if (c_val == "") {
			layer.msg("班级名称必填");
			cname.focus();
			return false;
		}

		//ajax传送数据给服务器
		axios.post('/addclass', {
				cname: c_val
			})
			.then(function(response) {
				console.log(response);
				if (response.data == "ok") {
					window.location.href = "/class";
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	})
}

function delclass() {
	let clist = document.querySelector(".classlist");
	//使用事件代理触发点击事件
	clist && (clist.onclick = function(e) {
		let target = e.target;
		if (target.classList.contains("delc")) { //点击的节点包含delc这个类名才执行一下代码
			//确定是否要删除的弹框
			layer.open({
				content: '是否要删除该内容',
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					// 点击确定执行的代码
					let cid = target.dataset.cid; //获取存储在自定义属性里面的cid
					axios.get('/delc', {
							params: {
								cid: cid
							}
						})
						.then(function(response) {
							if (response.data.r == "successed") {
								window.location.reload(); //自动刷新整个页面
								//target.parentNode.parentNode.remove();//或者删除该节点
							}
						})
						.catch(function(error) {
							console.log(error);
						});
				},
				btn2: function(index, layero) {
					//点击取消执行的代码
				},
				cancel: function() {
					//右上角关闭回调
				}
			});

		}
	})


}
