class car{
		constructor(options){
			this.goods()
			
			this.tbody = options.tbody;
			this.url = options.url;
			
			this.addEvent();
		}
//		商品
		goods(){
			var that = this;
		$.ajax({
		   url: "./data/goods.json",//json文件位置
		   type: "get",//请求方式为get
		   dataType: "json", //返回数据格式为json
		   success: function(res) {//请求成功完成后要执行的方法 
		       //each循环 使用$.each方法遍历返回的数据date
//		       $.each(res.first, function(i, i) {
//		            var str = '<div>姓名:' + item.name + '性别：' + item.sex + '</div>';
//		            document.write(str);
//		       })
//				console.log(res)
				
				that.carDisplay(res);
//				that.getCookie(res)
			}
		})
		}
//		getCookie(res){
////				获取cookie
////				4.渲染页面
//				this.carDisplay(res)
//			}
		
		carDisplay(res){
			this.goods = JSON.parse(getCookie("good"));
//			console.log(this.goods)	
			var str = "";
			for(var i=0;i<res.length;i++){
				for(var j=0;j<this.goods.length;j++){					
					if(res[i].id == this.goods[j].id){
//						console.log(res[i].id)
//						console.log(this.goods[j].id)
							
						str +=`<tr height="60" align="center">
							
							<td width="100">
								<input type="checkbox" name="" id="" value="" />
							</td>
							<td>
								<img src="${res[i].src}"/>
								<span>${res[i].name2}</span>
							</td>
							
							<td>${res[i].price1}</td>
							<td>
								<select></select>
							</td>
							<td>
								${res[i].price2}
							</td>
							<td><em data-index="${this.goods[j].id}">删除</em></td>
						</tr>`;
					}
				}
			}			
			$("table").children("#tbody").html(str);
		}

		addEvent(){
			var that = this;
			this.tbody.addEventListener("click",function(eve){
				if(eve.target.nodeName == "EM"){
//						找到点击商品的货号
					that.id = eve.target.getAttribute("data-index");
//						删除DOM元素 	
					eve.target.parentNode.parentNode.remove();
//						6.遍历cookie,找到符合条件的数据,做删除
					that.changeCookie(function(index){
//							8.删除并再次设置回去
						that.goods.splice(index,1);
					})
				}
			})
			this.tbody.addEventListener("input",function(eve){
				if(eve.target.type == "number"){
//						10.先获取修改之后的数量,再获取当前商品的id
					that.value = eve.target.value;
					that.id = eve.target.parentNode.nextElementSibling.children[0].getAttribute("data-index");
//						11.遍历cookie,找到符合条件的数据,做修改
					that.changeCookie(function(index){
						that.goods[index].num = that.value;
					});
				}
			})
		}
		changeCookie(callback){
//				7.找到cookie中符合条件的数据
				for(var i=0;i<this.goods.length;i++){
					if(this.goods[i].id == this.id){
						break;
					}
				}
				
				callback(i);
				
//				9.再设置回去
//				12.再设置回去
				setCookie("good",JSON.stringify(this.goods))
			}
		
	}	
		
	new car({
			tbody:document.getElementById("tbody"),
			url:"./data/goods.json"
		})