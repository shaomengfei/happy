class List{
	constructor(){
	    this.init();
	}
	
	init(){
			var that = this;
			$.ajax("./data/goods.json",{
				type:"get",
				dataType:"json",
				success:function(res){
					console.log(res)
					that.display(res);
				}
			});
			
		}
	display(res){
		var str = "";
		for(var i=0;i<res.length;i++){
			str+=`<li index="${res[i].id}">
                    <div class="xbox">
                    <a>
                        <img src="${res[i].src}">
                    </a>
                    <div class="title">
                        <p class="">${res[i].name1}</p>
                        <p class="">${res[i].name2}</p>       

                    </div>
                    <p class="price">
                        <span>${res[i].price1}</span>
                        <span><s>${res[i].price2}</s></span>
                    </p>
                    </div>
                </li>`
			
		}
		
		$("#new").find("ul").html(str);
		$("#new").find("ul").children("li").click(function(){
			$.cookie("goods",$(this).attr("index"))
			
			$(location).attr("href","./Details page/details.html")
		})
	}
	
}

new List()



