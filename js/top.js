$(function(){
	
	 if(isPC()){
		 var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        paginationClickable: true,
        keyboardControl: true,
		autoplay:3000,
		speed:1500,
		effect: 'fade',
		fade: {  crossFade: false},
		loop:true,
        pagination: '.swiper-pagination'
    	});
	 }else{
		var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        paginationClickable: true,
        keyboardControl: true,
		autoplay:3000,
		speed:500,
		loop:true,
		pagination: '.swiper-pagination',
      	});
	 }
	 
	
	function isPC() {
		var ret;
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if(width > 767) { ret = true;}
		else { ret= false;}
		return ret;
	}

});

