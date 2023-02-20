var pageid="";
var device="pc";

$(function(){
	pageid=$('body').attr("id");
	//DOMの読み込みが完了したら実行
	$(document).ready(function(){
		devicejuage();
		if(pageid=="home")roll();
		tab();
		dorwerchangejage();
		//if(device=="sp")spAccessJuage();
		validTelLink();
	});
	
	//画像ファイルの読み込みまで完了してから実行
	$(window).load(function(){
		
	});
	
	
	/*TEL*/
	function validTelLink(){
		if(!isPC()) {
		  $('.tel-link').each(function(){
			var str = $(this).text();
			var num = $(this).attr('title');
			$(this).replaceWith('<a href="tel:'+num.replace(/-/g,'')+'" class="tel_sp">' + str + '</a>');
			
		  });
		}
	}
	
	
	function devicejuage(){
		if (window.matchMedia('(max-width: 1100px)').matches) {
			device="sp";
			$('body').addClass('drower');
			dorwerchangejage();
			
		} else if (window.matchMedia('(min-width:1101px)').matches) {			
			device="pc";
			$('body.drower').removeClass('drower');
			dorwerchangejage();
		}
	}

	$(window).resize(function(){
		devicejuage();
	});
	
    $(window).scroll(function() {
		//if(device=="pc")dorwerchangejage();
		//if(device=="sp")spAccessJuage();
    });
	
	function spAccessJuage(){
		if ($(window).scrollTop() > $('.pagetitle').offset().top){
					TweenMax.to($('#head-access'), 0.5, { opacity:'0',delay: 0,ease: Power2.easeOut,onComplete: function(){ 
					$('#head-access').css({'display':'none'});
				}});
		}else{
					$('#head-access').css({'display':'block'});
					TweenMax.to($('#head-access'), 0.5,{ opacity:'1',delay: 0,ease: Power2.easeOut });
		}
	}
	
	
	
	function dorwerchangejage(){
		if (device=="sp") {
			if(drower!=true)drowerChange("view");
		} else {
			if(drower!=false && open==false)drowerChange("hiden");
		}
	}
	

	
	
	
	
	function isPC() {
		var ret;
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if(width > 1100) { ret = true;}
		else { ret= false;}
		return ret;
	}
	
	/*テーブルのスマホ用のdata-label属性を自動で設定*/
	function setTableTitle() {
		var tables = $('table.standard');
		var table, titles, lines, cells;
		for (var i=0; i < tables.length; i++) {
			table = $(tables[i]);
			titles = table.children('thead').find('th');/*theadのタイトル群を取得*/
			lines =  table.children(':not(thead)').find('tr');/*テーブルの中身を1行ずつ取得*/
			
			for (var j = 0; j< lines.length; j++) {
				var cells = $(lines[j]).children('th, td');
				for (var k = 0; k < cells.length; k++) {
					$(cells[k]).attr('data-label', $(titles[k]).text());
				}
			}
		}
	}
	
	
	/*ドロワーメニューの出し入れ*/
	var drower=false;
	function drowerChange(bl){
		if(bl=="view"){
			/*出す*/
			drower=true;
			$('body').addClass('drower');
			TweenMax.fromTo($('#btn_gNavi'), 0.5, { opacity:'0'},{ opacity:'1',delay: 0,ease: Power2.easeOut,onComplete: function(){
				
			 } });
			
			
			
		}else if(bl=="hiden"){
			console.log("2");
			/*隠す*/
			drower=false;
			TweenMax.fromTo($('#btn_gNavi'), 0.5, { opacity:'1'},{ opacity:'0', delay: 0,ease: Power2.easeOut,onComplete: function(){
				$('body.drower').removeClass('drower');
				TweenMax.fromTo($('.header-inner'), 0.5, { opacity:'0'},{ opacity:'1', delay: 0,ease: Power2.easeOut});
				console.log("3 drower削除");
				dorwerchangejage();
			 } });
			
			
			
			
		}
	}
	
	/*スマホメニューの開閉*/
	var open=false;
	$('.btn_open').click(function(e) {
		drowerToggle(open);
		e.stopPropagation();
	});
	
	
	
	function drowerToggle(bl){
		if(bl==false){
			$('body').addClass('open');
			TweenMax.fromTo($('.header-inner'), 1, { opacity:'0', y:'10px'},{ opacity:'1', y:'0px', delay: 0,ease: Power2.easeOut,onComplete: function(){
				open=true;
			 } });
		}else if(bl==true){
			TweenMax.fromTo($('.header-inner'), 0.5, { opacity:'1'},{ opacity:'0', delay: 0,ease: Power2.easeOut,onComplete: function(){
				$('body').removeClass('open');
				open=false;	 
				dorwerchangejage();
			 } });
		}
	}
	

});

/*tab*/
function tab(){
	
	if($('.tabfunc').length)$('.tabfunc').tabfunc();
	if($('.zukan').length){ $('.zukan').tabfunc();}
			/*$(function() {
				 if($('.tab').length)$(".tab li").click(function() {
					var tgt=$(".tab_wrap").eq($(".tab li").index(this));
					 TweenMax.fromTo($('.tab_wrap'), 0.5, { opacity:'1'},{ opacity:'0', delay: 0,ease: Power2.easeOut,onComplete: function(){
						 $(".tab_wrap.crt").removeClass('crt');
						 $(tgt).addClass('crt');
						 TweenMax.fromTo($('.tab_wrap.crt'), 0.5, { opacity:'0'},{ opacity:'1', ease: Power2.easeOut});
					 } });
					$(".tab li").removeClass('crt');
					$(this).addClass('crt');
				});
			});*/
}


/*ticher*/
function roll(){
		var $setElm = $('.topInfoWrap');
		var effectSpeed = 1000;
		var switchDelay = 6000;
		var easing = 'swing';

		$setElm.each(function(){
			var effectFilter = $(this).attr('rel'); // 'fade' or 'roll' or 'slide'

			var $targetObj = $(this);
			var $targetUl = $targetObj.children('ul');
			var $targetLi = $targetObj.find('li');
			var $setList = $targetObj.find('li:first');

			var ulWidth = $targetUl.width();
			var listHeight = $targetLi.height();
			$targetObj.css({height:(listHeight)});
			$targetLi.css({top:'0',left:'0',position:'absolute'});

			if(effectFilter == 'fade') {
				$setList.css({display:'block',opacity:'0',zIndex:'98'}).stop().animate({opacity:'1'},effectSpeed,easing).addClass('showlist');
				setInterval(function(){
					var $activeShow = $targetObj.find('.showlist');
					$activeShow.animate({opacity:'0'},effectSpeed,easing,function(){
						$(this).next().css({display:'block',opacity:'0',zIndex:'99'}).animate({opacity:'1'},effectSpeed,easing).addClass('showlist').end().appendTo($targetUl).css({display:'none',zIndex:'98'}).removeClass('showlist');
					});
				},switchDelay);
			} else if(effectFilter == 'roll') {
				$setList.css({top:'3em',display:'block',opacity:'0',zIndex:'98'}).stop().animate({top:'0',opacity:'1'},effectSpeed,easing).addClass('showlist');
				setInterval(function(){
					var $activeShow = $targetObj.find('.showlist');
					$activeShow.animate({top:'-3em',opacity:'0'},effectSpeed,easing).next().css({top:'3em',display:'block',opacity:'0',zIndex:'99'}).animate({top:'0',opacity:'1'},effectSpeed,easing).addClass('showlist').end().appendTo($targetUl).css({zIndex:'98'}).removeClass('showlist');
				},switchDelay);
			} else if(effectFilter == 'slide') {
				$setList.css({left:(ulWidth),display:'block',opacity:'0',zIndex:'98'}).stop().animate({left:'0',opacity:'1'},effectSpeed,easing).addClass('showlist');
				setInterval(function(){
					var $activeShow = $targetObj.find('.showlist');
					$activeShow.animate({left:(-(ulWidth)),opacity:'0'},effectSpeed,easing).next().css({left:(ulWidth),display:'block',opacity:'0',zIndex:'99'}).animate({left:'0',opacity:'1'},effectSpeed,easing).addClass('showlist').end().appendTo($targetUl).css({zIndex:'98'}).removeClass('showlist');
				},switchDelay);
			}
		});
}

	$('a[href^=#]').click(function() {
      var speed = 400;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
	   });


(function( $ ){
  $.fn.tabfunc = function() {
	  var tgt = this;
	  if($(tgt).children('.tab_wrap').length){
		  $('li',tgt).click(function() {
			  var contgt= $('.tab_wrap',tgt).eq($('li',tgt).index(this));
			  
			  TweenMax.fromTo($('.tab_wrap',tgt), 0.5, { opacity:'1'},{ opacity:'0', delay: 0,ease: Power2.easeOut,onComplete: function(){
				   $('.tab_wrap.crt',tgt).removeClass('crt');
				   $(contgt).addClass('crt');
				   TweenMax.fromTo( $('.tab_wrap.crt',tgt), 0.5, { opacity:'0'},{ opacity:'1', ease: Power2.easeOut});
			  }});
			  $('li',tgt).removeClass('crt');
		      $(this).addClass('crt');
		  });
	  }
  };

	

	
})( jQuery );


$(function(){
    // Windows版ChromeのWebフォントを多少キレイに表示する（影を付ける）
    // Techniques for Anti-Aliasing @font-face on Windows ・ GitHub
    // https://gist.github.com/dalethedeveloper/1846552
    var shadowify = function (e) {
        var color = $(e).css('color')

        // Got Hex color?  Modify with: http://stackoverflow.com/questions/1740700/get-hex-value-rather-than-rgb-value-using-jquery
        if ( color.search('rgb') == -1 ) {
            return;
        }
        var rgba = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
        //$(e).css('text-shadow', '0 0 0.1px rgba('+rgba[1]+','+rgba[2]+','+rgba[3]+',0.011)');
        //$(e).css('transform', 'rotate(0.05deg)');
    }

    if ((navigator.platform.indexOf('Win') != -1) && (navigator.userAgent.match(/chrome|opera/i)) && !(navigator.userAgent.match(/edge/i))) {
        $("p").each(function(){shadowify(this)});
        //^ Your appropriately targeted list of elements here ^
    }
});


