function setCookie(key,value,options){
//			设置默认值
			options = options ? options : {};
			if(options.expires){
				var d = new Date();
				d.setDate(d.getDate()+options.expires)
				var expi = ";expires="+d;
			}else{
				var expi = "";
			}
			
			if(options.path){
				var path = ";path="+options.path; 
			}else{
				var path = "";
			}
			
			document.cookie = key +"="+value +expi +path;
		}
//		
		function removeCookie(key,options){
			options = options ?options:{};
			options.expires = -1;
			setCookie(key,"smf",options);
		}
//		查
	function getCookie(key){
		var arr = document.cookie.split("; ");

		
		for(var i=0;i<arr.length;i++){
			if(arr[i].split("=")[0] ==key){
				return arr[i].split("=")[1];
			}
		}
	}
//	console.log(getCookie("b"));