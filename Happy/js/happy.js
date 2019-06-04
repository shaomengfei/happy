
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
				delayTime:0,						//可选，自动轮播时，没两张图片的间隔时间
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


class Search{
			constructor(){
				this.txt = document.querySelector(".txt");
				this.list = document.getElementById("list");
				this.url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
//				script.src='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=&cb=liyang';
				this.init();
			}
			init(){
				var that = this;
				this.txt.oninput = function(){
					
					that.value = this.value;
					that.load();
				}
			}
			load(){
				var that = this;
				ajax({
					url:this.url,
					type:"jsonp",
					data:{
						wd:this.value,
						cb:"saf",
						cloumnName:"cb"
					},
					success:function(res){
						that.res = res;
						
						that.display();
					}
				})
			}
			display(){
				var str = "";
				for(var i=0;i<this.res.s.length;i++){
					str +=`<li>${this.res.s[i]}</li>`
				}
				this.list.innerHTML = str;
			}
			
			
		}
		
		new Search();





		
		
		
		
		
		
		
		
