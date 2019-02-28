$(function(){
	fun.init();
	fun.load();
})
let fun = {
	init:function(){
		$('a[href="#"]').click(function(e){
			e.preventDefault();
		})
	},
	load:function(){
		$('.main .detail').hide();
		$('.main .detail').each(function(){
			// $(this).parent().next().slideUp();
			console.log('$this',$(this));
			if($(this).hasClass('active')){
				$(this).slideDown(100);
			}
		});
		$('.main p>a').click(function(){
			var $a = $(this);
			var $target = $a.parent().next();
			console.log($a)
			console.log($target)
			$('.main p>a').removeClass('active');
			$a.addClass('active');
			if(!$target.hasClass('active')){
				$('.main .detail').removeClass('active').slideUp(100);
				$target.addClass('active').slideDown(100);
			}
		});
		$('.plus').click(function(){
			$('.main .social-link').toggleClass('linkactive');
		})
		$('.social-link').click(function(){
			$('.main .social-link').toggleClass('linkactive');
		})
	}
}