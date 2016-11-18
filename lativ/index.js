$(function(){

	$('.header ul li a').eq(5).css("border-right","none");
	$('.main .information ul li').eq(4).css("border-right","none");
	$('.header ol .shopping_cart').hover(function(){
		$('.shopping_cart_list',this).stop().slideDown(300);
	},function(){
		$('.shopping_cart_list',this).stop().slideUp(300);
	})



	var width=1180;    			//图片宽度
	var timer=null;							//定时器
	var i=0; 								//索引
	var clone=$('.main .carousel-box ul li').first().clone(); 	//复制第一个
	$('.main .carousel-box ul').append(clone);					//添加第一张图片到最后
	
	var num=$('.main .carousel-box ul li').length;				//初始化 添加数字按钮	
	for (var j = 1; j <=num-1; j++) {
		var li="<li></li>";
		$('.main .carousel-box ol').append(li);
	}

	$('.main .carousel-box ol li').eq(0).addClass('active');  

	
	$('.main .carousel-box ol li').on('click', function(event) {		//手动点击
		i=$(this).index();
		$(this).addClass('active').siblings().removeClass("active");
		$('.main .carousel-box ul').animate({
			'left':-width*i,
		})
	});
	
	autoPlay();								//调用自动轮播
	
	$('.main .carousel-box').hover(function(){				//鼠标悬浮停止
		clearInterval(timer);
	},autoPlay);

	
	$('.main .carousel-box .left').on('click', function() {		//左按钮
		i--;
		move();
	});
	
	$('.main .carousel-box .right').on('click', function() {	//右按钮
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
			$('.main .carousel-box ul').css({
				left:0
			});
			i=1;
		}
		if (i<0) {
			$('.main .carousel-box ul').css({
				left:-5900
			});
			i=num-2;
		};
		
		$('.main .carousel-box ul').stop().animate({'left':-width*i},1000);			//图片运动
		
		if (i>num-2) {										//数字背景颜色变化
			$('.main .carousel-box ol li').eq(0).addClass('active').siblings().removeClass("active");
		}else{
			$('.main .carousel-box ol li').eq(i).addClass('active').siblings().removeClass("active");
		}	
	}

})