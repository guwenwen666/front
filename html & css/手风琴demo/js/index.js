$(function(){
	Profile.load();
});

Profile = {
	load:function(){
		this.links();
		this.social();
		this.container();
	},
	links:function(){
		$('a[href="#"]').click(function(e){
			console.log(e);
			e.preventDefault();
		});
	},
	social:function(){
		$('.container .about-me .photo .photo-overlay .plus').click(function(){
			$('.social-link').toggleClass('active');
			$('.about-me').toggleClass('blur');
		});
		$('.social-link').click(function(){
			$(this).toggleClass('active');
			$('.about-me').toggleClass('blur');
		});
	},
	container:function(){
		var subMenus = $('.container .sub-nav').hide();
		console.log("subMenus",subMenus)
		$('.container > a').each(function(){
			if($(this).hasClass('active')){
				$(this).next().slideDown(100);
			}
		});
		$('.container > a').click(function(){
			$this = $(this);
			console.log('this',this);
			console.log('$this',$this);
			$target =  $this.next();
			console.log($target);
			$this.siblings('a').removeAttr('class');
			$this.addClass('active');
			if(!$target.hasClass('active')){
				subMenus.removeClass('active').slideUp(100);
				$target.addClass('active').slideDown(100);
			}
			return false;
		});
	}
}