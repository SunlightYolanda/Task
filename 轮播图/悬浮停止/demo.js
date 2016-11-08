$(function(){
	var timer=null;
	var iNow=0; //图片索引
	$('.slideShow .btns span').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		iNow =$(this).index();
		$('.slideShow ul').animate({
			"left":-$('.slideShow img').width()*iNow,
		});
	})
	/*如果不点击，模拟事件启动；如果点击，点击事件完成后继续模拟*/	

	//封装定时自动轮播代码
	function autoPlay(){
		timer=setInterval(function(){
			iNow++;
			if (iNow>$('.slideShow .btns span').length-1) {
				$('.slideShow ul').css("left","0"); //让ul马上归零，避免4，3，2，1倒着来
				iNow=0;
			}
			$('.slideShow .btns span').eq(iNow).trigger('click');
			},2000);
	}

	//自动轮播
	autoPlay();

	//鼠标悬浮代码
	$('.slideShow').hover(
		function(){
			clearInterval(timer);
		},autoPlay      //不需要加括号！！！
	);
})