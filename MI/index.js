$(function(){

	/*购物车*/
	$('.header-right li').eq(3).hover(function() {
		$('ul',this).slideDown(200);  //$('ul',this)表示$(子，父)  从父节点里找ul子元素！！！！
		$('a',this).css({"color":"rgb(255,103,0)","background-color":"white"});
	}, function() {
		$('ul', this).slideUp(100);
		$('a',this).css({"color":"#b0b0b0","background-color":"rgb(51,51,51)"});  
	});

	/*顶部导航下滑菜单*/
	$('#logo-nav-search li ').hover(function() {
		$('#top-nav-box',this).stop().slideDown(300);  //$('ul',this)表示$(子，父)  从父节点里找ul子元素！！！！
	}, function() {
		$('#top-nav-box', this).stop().slideUp(300); 
	});

	/*顶部轮播图效果*/
	var num=$('#carousel ul li').length; 	//代码初始化,可以动态添加数字按钮，不用手动添加
	for (var j = 1; j <=num; j++) {
		var li="<li></li>";
		$('#carousel ol').append(li);
	}
	$('#carousel ul li').eq(0).css("display","block");
	$('#carousel ol li').eq(0).addClass('active');
	var i=0;								//当前索引
	var timer=null;							//计时器
	$('#carousel ol li').click(function(){ //点击轮播
		i=$(this).index(); 					//获取当前索引
		$(this).addClass('active').siblings().removeClass('active');
		$('#carousel ul li').eq(i).stop().fadeIn(500).siblings().stop().fadeOut(500); //在动画前停止前一个的动画
	})
	/*自动轮播函数*/
	function autoPlay(){				
		timer=setInterval(function(){
			i++;
			if (i>num-1) {
				i=0;
			}
			$('#carousel ol li').eq(i).trigger('click');
		},5000);
	}
	autoPlay();								//进行自动轮播
	$('#carousel').hover(function(){		//鼠标悬浮停止
		clearInterval(timer);
	},autoPlay);
	$('#carousel .left').on('click', function() {	//大轮播图左按钮
		clearInterval(timer);
		i--;
		if (i<0) {
			i=num-1;
		}
		$('#carousel ol li').eq(i).addClass('active').siblings().removeClass('active');
		$('#carousel ul li').eq(i).stop().fadeIn(500).siblings().stop().fadeOut(500);
	});
	
	$('#carousel .right').on('click', function() {		//大轮播图右按钮
		clearInterval(timer);
		i++;
		if (i>num-1) {
			i=0;
		}
		$('#carousel ol li').eq(i).addClass('active').siblings().removeClass('active');
		$('#carousel ul li').eq(i).stop().fadeIn(500).siblings().stop().fadeOut(500);
	});
	/*明星产品手动轮播*/
	$('#star-products .star-products-left').css({"cursor":"default","color":"#E0E0E0"});    
	$('#star-products .star-products-right').on('click', function() {						//右按钮
		$(this).css({"cursor":"default","color":"#E0E0E0"});
		$('#star-products .star-products-left').css({"cursor":"pointer","color":"#BDB1B0"});
		$('#star-products .star-products-carousel-box ul').animate({
			left:"-1228"
		});
	});
	$('#star-products .star-products-left').on('click', function() {						//左按钮
		$(this).css({"cursor":"default","color":"#E0E0E0"});
		$('#star-products .star-products-right').css({"cursor":"pointer","color":"#BDB1B0"});
		$('#star-products .star-products-carousel-box ul').animate({
			left:"0"
		});
	});
	/*明星产品自动轮播*/
	setTimeout(function(){       			//加载5秒后执行1次。只在第5秒执行：点击右按钮
		$('#star-products .star-products-right').trigger('click');
	},5000);
	setInterval(function(){					//加载后每10秒执行一次，第一次执行在加载10秒之后 开始     
		$('#star-products .star-products-left').trigger('click');      //加载后10秒点击左按钮
		setTimeout(function(){											//setInterval开始执行后，再延迟5秒第一次执行
			$('#star-products .star-products-right').trigger('click');   //也就是加载后15秒第一次点击右按钮
		},5000)
	},10000)

	/*硬件右侧 查看更多 鼠标移入效果*/
	$('#hardware a').hover(function(){
		$(this).css("color","#FF6700");
		$('span',this).css('background-color','#FF6700');
	},function(){
		$(this).css("color","");
		$('span',this).css('background-color','');
	})
	/*硬件浮动效果+阴影+弹出卡片效果*/
	$('#hardware .hardware-box dl,.big').hover(function(){
		var liIndex=$('#hardware .hardware-box ul li').index();
		$(this).eq(liIndex).css('position', 'relative').animate({top:'-3px'},200).addClass('boxShadows');
		$('.evaluation',this).eq(liIndex).stop().slideDown(200);
	},function(){
		var liIndex=$('#hardware .hardware-box ul li').index();
		$(this).eq(liIndex).css('position', 'relative').animate({top:''},200).removeClass('boxShadows');
		$('.evaluation',this).eq(liIndex).stop().slideUp(200);
	})

	/*内容浮动效果*/
	$('#content .outList > li').hover(function(){
		$(this).addClass('boxShadows').css('position', 'relative').stop().animate({top:'-3px'},200);
		$('span',this).css('display','block');
	},function(){
		$(this).removeClass('boxShadows').css('position','relative').stop().animate({top:'0'},200);
		$('span',this).css('display','none');
	})
	/*遍历最外面的列表，得到每一个小的轮播图，方便操作*/
	$('#content .outList li').each(function(){
		$('.content-left-span',this).css('cursor','default'); //默认左按钮光标正常
		var index=0;   //设置索引号为0
		$('ol li:first-child',this).addClass('content-active'); //设置第一个圆形按钮样式
		$('ol li',this).on('click', function() {
			index=$(this).index();    						 //正在点击的圆形按钮的索引号
			$(this).addClass('content-active').siblings().removeClass('content-active');  //改变正在点击的按钮样式
			$(this).parent().parent().find('ul').animate({'left':-300*index});       //通过两次查找父元素，回到外部列表的li元素，找到图片列表，实现轮播
		});
		$('.content-left-span',this).on('click', function() {   //小轮播图左按钮
			index--;
			if (index<0) {
				index=0;
				$(this).css('cursor','default');
			}
			$(this).parent().find('ol li').eq(index).addClass('content-active').siblings().removeClass('content-active');
			$(this).parent().find('ul').animate({'left':-300*index});	
			$(this).parent().find('.content-right-span').css('cursor', 'pointer');
		});
		$('.content-right-span',this).on('click', function() {   //小轮播图右按钮
			index++;
			if (index>2) {
				index=2;
				$(this).css('cursor','default');
			}
			$(this).parent().find('ol li').eq(index).addClass('content-active').siblings().removeClass('content-active');
			$(this).parent().find('ul').animate({'left':-300*index});
			$(this).parent().find('.content-left-span').css('cursor','pointer');
		});
	})
})
