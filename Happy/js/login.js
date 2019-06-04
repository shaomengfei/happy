class Login{
			constructor(){
				this.url = "http://www.icodeilife.cn/ctrl/login.php";
				
				this.init()
			}
			init(){
				var that = this;
				$("#btn").click(function(){
					that.load()
				})
			}
			load(){
				var that = this;
				$.ajax({
					url:this.url,
					data:{
						user:$("#user").val(),
						pass:$("#pass").val()
					},
					success:function(res){
						switch(res){
							case "0":
								$("b").html("用户名密码不符");break;
							case "1":
								$("b").html("重新登录");break;
							default:
//								因为接口问题,返回json数据时表示成功,json数据不好判断,所以,直接使用default判断
								$("b").html("");
								setTimeout(()=>{
									location.href = "../index.html";
								})
								break;
								that.res = JSON.parse(res)
								console.log(that.res)
						}
					},
//					beforeSend:function(){
//						$("span").html("<img src='loading.gif'>")
//					}
				})
			}
		}
		
		new Login;