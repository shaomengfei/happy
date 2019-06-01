class Index{
	constructor() {
	    this.init();
	    // this.floor();
	}
	
	init(){
	//轮播图
	$("#banner").banner({
				items:$("#banner a"),		//必传项，表示要移动的图片
				// left:$("#banner .btns .left"),		//可选，左按钮
				// right:$("#banner .btns .right"),	//可选，右按钮
				isList:true,						//可选，是否需要自动生成list
				autoPlay:true,						//可选，是否需要自动轮播
				delayTime:3000,						//可选，自动轮播时，没两张图片的间隔时间
				moveTime:300						//可选，每张图片运动的时间
			})
	}
}
new Index();