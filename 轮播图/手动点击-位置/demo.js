$(function(){
	$('.slideShow .btns span').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		var index=$(this).index();
		$('.slideShow ul').animate({
			"left":-$('.slideShow img').width()*index,
		})
	})
})