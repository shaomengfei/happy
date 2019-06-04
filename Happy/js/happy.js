class Index{
	constructor() {
	    this.init();
	    this.floor();
	}
	
	init(){
	//轮播图
	$("#banner").banner({
				items:$("#banner .imgbox a"),		//必传项，表示要移动的图片
				left:$("#banner .btns .left"),		//可选，左按钮
				right:$("#banner .btns .right"),	//可选，右按钮
				isList:true,						//可选，是否需要自动生成list
				autoPlay:true,						//可选，是否需要自动轮播
				delayTime:3000,						//可选，自动轮播时，没两张图片的间隔时间
				moveTime:600						//可选，每张图片运动的时间
			})
	}

	floor(){
	$(".louceng").children("li").click(function(){
				
	//			console.log($(".div"+($(this).index()+1)).position())
				
	//			拿到索引,计算选择器的数字
				var index = $(this).index()+1;
				
	//			根据选择器选择到标签,获取距离顶部的位置
				var t = $(".xbox"+index).offset().top;
				
	//			设置动画
				$("html").animate({
					scrollTop:t
				})
				
			})
	}
	

}
new Index();


function Search(){
//			1.选元素,设置url
			this.txt = document.querySelector(".txt");
			this.ul = document.getElementById("list");
			this.url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
			
//			2.绑定事件
			this.addEvent();
		}
		Search.prototype.addEvent = function(){
			var that = this;
			this.txt.onkeyup = function(){
//				3.保存输入框的内容
				that.val = this.value;
				console.log(that.val)
//				4.准备请求数据
				that.load()
			}
		}
		Search.prototype.load = function(){
			var that = this;
			jsonp(this.url,function(res){
//				5.将数据保存到将来的实例对象
				that.res = res;
//				6.请求成功之后,才能够去渲染页面
				that.display();
			},{
				_name:"cb",
				cb:"asdasgtdsa",
				wd:this.val
			})
		}
		Search.prototype.display = function(){
//			7.渲染页面
			var str= ""
			this.res.s.forEach(function(v){
				str += `<li>${v}</li>`;
			})
			this.ul.innerHTML = str;
		}
		
		new Search();






		
		
		
		
		
		
		
		
