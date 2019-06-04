class Magnifier{
			constructor(){
				this.sBox = document.querySelector(".s-box")
				this.bBox = document.querySelector(".b-box")
				this.span = document.querySelector("span")
				this.sImg = document.querySelector(".s-box img");
				this.bImg = document.querySelector(".b-box img");
				this.imgs = document.querySelectorAll(".imgs img")
				this.addEvent()
				this.change()
			}
			addEvent(){
				var that = this;
				this.sBox.onmouseover = function(){
					that.over();
				}
				this.sBox.onmouseout = function(){
					that.out();
				}
				this.sBox.onmousemove = function(eve){
					var e =eve ||window.event;
					
					that.move(e)
				}
			}
			over(){
				this.bBox.style.display = "block";
			}
			out(){
				this.bBox.style.display = "none";
			}
			move(e){
				
				this.l = e.clientX - this.span.offsetWidth;
				this.t = e.clientY - this.span.offsetHeight ;
				if(this.l<0) this.l=0;
				if(this.t<0) this.t=0;
				if(this.l>this.sBox.offsetWidth - this.span.offsetWidth){
					this.l = this.sBox.offsetWidth - this.span.offsetWidth
				}
				if(this.t>this.sBox.offsetHeight - this.span.offsetHeight){
					this.t = this.sBox.offsetHeight - this.span.offsetHeight
				}
				this.span.style.left = this.l +"px"
				this.span.style.top = this.t+"px"
				
				this.display()
			}
			
			display(){
				this.x = this.l/(this.sBox.offsetWidth - this.span.offsetWidth)
				this.y = this.t/(this.sBox.offsetHeight - this.span.offsetHeight)
				this.bImg.style.left = (this.bBox.offsetWidth - this.bImg.offsetWidth)*this.x +"px";
				this.bImg.style.top = (this.bBox.offsetHeight - this.bImg.offsetHeight)*this.y +"px"
				
			}
			
			change(){
				for(var i=0;i<this.imgs.length;i++){
					var that = this;
					this.imgs[i].onclick = function(){
//						获取图片的src
						that.src = this.getAttribute("src");
						that.sImg.setAttribute("src",that.src);
						that.bImg.setAttribute("src",that.src);
					}
				}
			}
			
			
		}
		
//		new Magnifier();
//	-------------------------------------	
class details{
	constructor(){
	    this.goods()
	}
	goods(){
		var that = this;
		$.ajax({
			url:"../data/goods.json",
			type:"get",
			dataType:"json",
			success:function(res){
				console.log(res)
				that.goodsDisplay(res);
			}
			
		})
	}
	goodsDisplay(res){
		var str = "";
		for(var i=0;i<res.length;i++){
			if(res[i].id == $.cookie("goods")){
				console.log(res[i])
				str+=`<div class="left">
                <img src="${res[i].src}" >
            </div>
           	
            <div class="right">
                <p>
                    <span>[</span>
                    <em>${res[i].name1}</em>
                    <span>]</span>
                    <b>${res[i].name2}</b>
                </p>
                <h2>再时髦的人也怕掉头发，不要让你的头发失去呵护，梳美人梳子，不上油漆，防静电，按摩舒适，柔顺发丝，陪你从青丝走到白发。</h2>
                <div class="price">
                    <span>快乐价</span>
                    <em>${res[i].price1}</em>
                </div>
                <div class="fen">
                    <ul>
                        <li>
                            颜色<input type="text" value="默认">
                        </li>
                        <li>
                            尺码<input type="text" value="默认">
                        </li>
                        <li>
                            数量<input type="number" min="1" value="1">
                        </li>
                    </ul>
                    <p>
                        <a href="">立即购买</a>
                        <a href="../car/car.html" class="a2" id="btn">加入购物车</a>
                    </p>
                </div>
            </div>
        </div>`
			}
		}
		$(".box").html(str)
		this.addEvent();
		new Magnifier();
		
	}
	addEvent(){
				var that = this;
//				console.log($(".m-r-c").children(".div5").children("a").eq())
				this.cont =document.querySelector("p .a1")
				this.cont.addEventListener("click",function(eve){
					if(eve.target.id == "btn"){
						console.log(this)
//						6.被点击时,获取货号,存cookie
						that.id = eve.target.parentNode.getAttribute("index");
						console.log(that.id)
						that.setCookie()
					}
				})
			}
			setCookie(){
//				因为要使用一条cookie存商品,所以数据选择数组里面放对象[{},{}]
				this.goods = getCookie("good");
//				情况1:第一次添加
				if(this.goods == ""){
					this.goods = [{
						id:this.id,
						num:1
					}];
				}else{
//					情况2:不是第一次添加
					this.goods = JSON.parse(this.goods);
//					新情况1：这次点击的是老数据
					var onoff = true;
					this.goods.forEach((v)=>{
						if(v.id == this.id){
							v.num++
							onoff = false;
						}
					})
					
//					新情况2：这次点击的是新数据
					if(onoff){
						this.goods.push({
							id:this.id,
							num:1
						})
					}
				}
//				所有关于数组的操作结束之后,将数组转成字符再设置到cookie中
				setCookie("good",JSON.stringify(this.goods))
//				console.log(getCookie("good"))
			}	
	
}


new details()






















