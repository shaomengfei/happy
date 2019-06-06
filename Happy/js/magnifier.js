function Magfinier(){
			this.sbox=document.querySelector(".left");
			this.pbox=this.sbox.children[1];
			this.bbox=document.querySelector(".m-y");
			this.bimg=this.bbox.children[0];				
			this.imgs = document.querySelectorAll(".imgs img")
			this.sImg = document.querySelector(".left img");
				this.bImg = document.querySelector(".m-y img");
			
			
			this.addEvent();
			this.change();
		}
		Magfinier.prototype.addEvent=function(){
			var that=this;
			this.sbox.onmouseover=function(){
				that.show();
			}
			this.sbox.onmouseout=function(){
				that.hide();
			}
		}
		Magfinier.prototype.show=function(){
			this.pbox.style.display="block";
			this.bbox.style.display="block";
			this.addMove();
		}
		
		Magfinier.prototype.hide=function(){
			this.pbox.style.display="none";
			this.bbox.style.display="none";
		}
		
		
		Magfinier.prototype.addMove=function(){
			var that=this;
			this.sbox.onmousemove=function(eve){
				var e=eve || window.event;
				that.pBoxMove(e)
			}
		}
		Magfinier.prototype.pBoxMove=function(e){
			
			this.l=e.offsetX-this.pbox.offsetWidth/2
			this.t=e.offsetY-this.pbox.offsetHeight/2
			if(this.l<0){this.l=0};
			if(this.t<0){this.t=0};
			if(this.l>this.sbox.offsetWidth-this.pbox.offsetWidth){
				this.l=this.sbox.offsetWidth-this.pbox.offsetWidth;
			}
			if(this.t>this.sbox.offsetHeight-this.pbox.offsetHeight){
				this.t=this.sbox.offsetHeight-this.pbox.offsetHeight
			}
			this.pbox.style.left=this.l+"px"
			this.pbox.style.top=this.t+"px"
			
			this.x=this.l/(this.sbox.offsetWidth-this.pbox.offsetWidth)
			this.y=this.t/(this.sbox.offsetHeight-this.pbox.offsetHeight)
			
			this.move();
		}
		Magfinier.prototype.move=function(){
			this.bimg.style.left=-(this.bimg.offsetWidth-this.bbox.offsetWidth)*this.x+"px"
			this.bimg.style.top=-(this.bimg.offsetHeight-this.bbox.offsetHeight)*this.y+"px"
		}
		
		Magfinier.prototype.change = function(){
			
			for(var i=0;i<this.imgs.length;i++){
				var that = this;
//				console.log(this.imgs.length)
				this.imgs[i].onclick = function(){
//						获取图片的src
					that.src = this.getAttribute("src");
					that.sImg.setAttribute("src",that.src);
					that.bImg.setAttribute("src",that.src);
				}
			}
			
		}
		
			
//	-------------------------------------	
class details{
	constructor(){
	    this.goods()
	}
	goods(){
		var that = this;
		$.ajax({
			url:"../data/all.json",
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
				str+=`
				<div class="left">
                <img src="${res[i].src}" />
                <span></span>
				<p></p>
            </div>
           	<div class="m-y">
				<img src="${res[i].src}">
			</div>
//			----------------------
			<div class="imgs">
			<img src="${res[i].src}">
    		<img src="http://img10.360buyimg.com/n8/jfs/t1/30525/38/3722/336626/5c777ea5Ecd676d65/667e9abf8dd13b86.jpg" />
    		<img src= "http://img14.360buyimg.com/n8/jfs/t1/19042/4/12985/88537/5c9b5621Eb94ea167/cf5bd6cc7f6d8d01.jpg" />
    	</div>
            <div class="right">
                <p>
                    <span>[</span>
                    <em>${res[i].name1}</em>
                    <span>]</span>
                    <b>${res[i].name2}</b>
                </p>
                
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
                        <span><a href="">立即购买</a></span>
                        <span index="${res[i].id}"><a href="car.html" class="a2" id="btn" >加入购物车</a><span>
                    </p>
                </div>
            </div>
        </div>`
			}
		}
		$(".box").html(str)
		this.addEvent();
		new Magfinier();
		
	}
	addEvent(){
				var that = this;
//				console.log($(".m-r-c").children(".div5").children("a").eq())
				this.cont =document.querySelector("p .a2")
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
				console.log(this.goods)
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






















