
function move(ele,data,callback){
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		var onoff = true;
		for(var attr in data){
			if(attr == "opacity"){
				var iNow = getStyle(ele,attr)*100
			}else{
				var iNow = parseInt(getStyle(ele,attr));
			}
			
			var speed = (data[attr] - iNow)/8;
//			要将speed设置回去,否则还是没有向上或向下取整
			if(speed<0){
				speed =	Math.floor(speed);
			}else{
				speed =	Math.ceil(speed);
			}
			
//		speed = speed<0 ? Math.floor(speed) : Math.ceil(speed)
			
			if(data[attr] != iNow){
				onoff = false;
			}
			if(attr == "opacity"){
				ele.style[attr] = (iNow + speed)/100
			}else{
				ele.style[attr] = iNow + speed +"px";
			}
		}
		if(onoff){
			clearInterval(ele.timer);
//			没有传回调函数时,不执行,在回调函数中,可以写任何代码,且也不限于再次传move
		
			callback && callback();
		
		}
		
	},30)
			
}
		
function getStyle(ele,attr){
	if(getComputedStyle){
		return getComputedStyle(ele,false)[attr];
	}else{
		return ele.currentStyle[attr];
	}
}























