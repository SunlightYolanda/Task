$(function(){
	var width=$('img').width();    			//图片宽度
	var timer=null;							//定时器
	var i=0; 								//索引
	var clone=$('ul li').first().clone(); 	//复制第一个
	$('ul').append(clone);					//添加第一张图片到最后
	
	var num=$('ul li').length;				//初始化 添加数字按钮	
	for (var j = 1; j <=num-1; j++) {
		var li="<li>"+j+"</li>";
		$('.out ol').append(li);
	}

	$('.out ol li').eq(0).addClass('active');  

	
	$('ol li').on('click', function(event) {		//手动点击
		i=$(this).index();
		$(this).addClass('active').siblings().removeClass("active");
		$('ul').animate({
			'left':-width*i,
		})
	});
	
	autoPlay();								//调用自动轮播
	
	$('.out').hover(function(){				//鼠标悬浮停止
		clearInterval(timer);
	},autoPlay);

	
	$('.left').on('click', function() {		//左按钮
		i--;
		move();
	});
	
	$('.right').on('click', function() {	//右按钮
		i++;
		move();
		
	});
	
	function autoPlay(){					//自动轮播功能
		timer=setInterval(function(){
			i++;
			move();
		},3000)
	}
	
	function move(){						//运动函数
		if (i>num-1) {
			$('.out ul').css({
				left:0
			});
			i=1;
		}
		if (i<0) {
			$('.out ul').css({
				left:-1600
			});
			i=num-2;
		};
		
		$('ul').stop().animate({'left':-width*i},1000);			//图片运动
		
		if (i>num-2) {										//数字背景颜色变化
			$('ol li').eq(0).addClass('active').siblings().removeClass("active");
		}else{
			$('ol li').eq(i).addClass('active').siblings().removeClass("active");
		}	
	}

})