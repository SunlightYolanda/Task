$(function(){
	//代码初始化,可以动态添加数字按钮，不用手动添加
	var num=$('ul li').length;
	for (var i = 1; i <=num; i++) {
		var li="<li>"+i+"</li>";
		$('.out ol').append(li);
	}
	$('.out ul li').eq(0).css("display","block");
	$('.out ol li').eq(0).addClass('active');
	var i=0;//当前索引
	var timer=null;//计时器
	//点击轮播
	$('.out ol li').click(function(){
		i=$(this).index();//获取当前索引
		$(this).addClass('active').siblings().removeClass('active');
		$('.out ul li').eq(i).stop().fadeIn(500).siblings().stop().fadeOut(500); //在动画前停止前一个的动画
	})
	//自动轮播函数
	function autoPlay(){
		 timer=setInterval(function(){
			i++;
			if (i>num-1) {
				i=0;
			}
			$('.out ol li').eq(i).trigger('click');
		},3000);
	}
	//进行自动轮播
	autoPlay();
	//鼠标悬浮停止
	$('.out').hover(function(){
		clearInterval(timer);
	},autoPlay);
	//左按钮
	$('.left').on('click', function() {
		clearInterval(timer);
		i--;
		if (i<0) {
			i=num-1;
		}
		$('.out ol li').eq(i).addClass('active').siblings().removeClass('active');
		$('.out ul li').eq(i).stop().fadeIn(500).siblings().stop().fadeOut(500);
	});
	//右按钮
	$('.right').on('click', function() {
		clearInterval(timer);
		i++;
		if (i>num-1) {
			i=0;
		}
		$('.out ol li').eq(i).addClass('active').siblings().removeClass('active');
		$('.out ul li').eq(i).stop().fadeIn(500).siblings().stop().fadeOut(500);
	});
})