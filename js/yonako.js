/*横並びのコンテンツの高さを揃える tile*/
var pageid="";
var device="pc";
$(function(){
	
	pageid=$('body').attr("id");
	if(!isPC())$('body').addClass('sp');
	
	
	/*navのfix*/
	var fixNum=50;
	if(pageid=="home"){
		fixNum=parseInt($('#main').css('height'))/2;
	}
	var $header = $('#top-head');
        $(window).scroll(function() {
            if ($(window).scrollTop() > fixNum) {
                $header.addClass('fixed');
				$('body').addClass('fixed');
            } else {
                $header.removeClass('fixed');
				$('body').removeClass('fixed');
            }
     });
	
	/* loading*/
	
	$(window).load(function(){
		adjustContentsHeight();
			onWindowResize();
		    loadEnd();
		  $('#barba-wrapper').css('display', 'block');

	});
	
	/* resize x*/
	$(window).resize(function(){
		adjustContentsHeight();
		onWindowResize();
	});
	
	
	/*レスポンシブ*/
	var onWindowResize = function() {
		// モバイル
		if (/Android|iPhone|iPod/i.test(navigator.userAgent)) {
			device="sp";
			return;
		}
	
		if (window.matchMedia('(max-width: 768px)').matches) {
			device="sp";
		} else if (window.matchMedia('(min-width:769px)').matches) {
			device="pc";
		}
	};
	
	
	/*高さ*/
	function adjustContentsHeight() {
		for(var i=2; i< 10; i++) {
				var elms=$('.column'+i);
				for(j =0; j < elms.length; j++){
					$(elms[j]).children().tile(i);
				}
				
			}
			$('#gNavi li a').tile();
		$('.tile1').tile();
	}
	
	/*PCかどうか？*/
	function isPC() {
		var ret;
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if(width > 1110) { ret = true;}
		else { ret= false;}
		return ret;
	}
	
	/*モーダルについて？*/
	modal();
	function modal(){
		 $('.photo .thumbList li a').magnificPopup({
          type: 'image',
          closeOnContentClick: true,
          closeBtnInside: false,
          fixedContentPos: true,
          mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
          image: {
            verticalFit: true
          },
          zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
          }
        });
		
		 $('a#contactMBtn').magnificPopup({
          type: 'ajax'
        });
		
	}
	
	/*アンカー移動*/
	$('a[href^=#]').click(function() {
      // スクロールの速度
      var speed = 400; // ミリ秒
      // アンカーの値取得
      var href= $(this).attr("href");
      // 移動先を取得
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を数値で取得
      var position = target.offset().top-80;
      // スムーススクロール
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
	
	
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
	/*テーブルの開閉*/
	$('table.toggleTable th').click(function() {
		if(!isPC()) {
			$(this).toggleClass('open');
			$(this).parent('tr').find('td').slideToggle();
		}
	});
	function initTablePC() {
		if(isPC()) {
			$('table.toggleTable td').css('display', '');
		}
	};
	function initTableSP() {
		if(!isPC()) {
			$('table.toggleTable td').css('display', 'none');
		}
	};
	
	/*-----------------------------------------------------------
	animetion
	
	1.home
	
	-----------------------------------------------------------*/
	var controller = new ScrollMagic();
	 if(pageid=="home"){
		homeAnime();
	 }else{
	 }
	 
	/*0.load*/
	function loadEnd(){
		TweenMax.fromTo($('#loader-bg'), 1, { opacity:'1'},{ opacity:'0', delay: 1,ease: Power2.easeOut,onComplete: function(){$('body').addClass("end"); } }, 1);
		TweenMax.fromTo($('#loader'), 1,  { opacity:'1'},{ opacity:'0', delay: 1,ease: Power2.easeOut }, 1);
		TweenMax.fromTo($('.mainWrap'), 1.5,  { scale: 1.1},{ scale: 1, delay: 1});
		TweenMax.fromTo($('#bg'), 1.5,  {y:200, scale: 1.1},{y:0, scale: 1, delay: 1});
		if(isPC())TweenMax.fromTo($('#barba-wrapper'), 1.5,  { backgroundPosition:"0 100%"},{ backgroundPosition:"0 90%", delay: 1,ease: Power2.easeOut});		
	}
	 
	/*1.home*/
	function homeAnime(){
		// シーンをつくります。
		// triggerElementに渡した要素が表示範囲にはいったらsetTweenで渡したアニメーションが実行されます ("#main" {opacity: 0})
		//「onCenter」「onEnter」「onLeave」
		var mainLeadDuration=1000;
		if(isPC()){
			var mainLead = new ScrollScene({triggerElement: "body",triggerHook: "onLeave", duration: mainLeadDuration})
                .on("progress", function (prog) { // 使いたいシーンに対してprogressイベントを設定します
                    var p = prog.progress; // 0～1の値が入ってきます
					console.log(p)
					num="0 "+(45-(25*p))+"vh"
					TweenMax.set('#bg',{backgroundPosition:num});
                })
        .addTo(controller);
		}
		
		
		
		var tweenEntry = TweenMax.from($('#entryBrn'), 0.5, { y:10,opacity:'0',delay : 0.5});
		var entry = new ScrollScene({triggerElement: "#entryBrn",triggerHook: 'onEnter'}).setTween(tweenEntry).addTo(controller);
		
		
		var tweenSchedule = new TimelineMax ()
				.add([
					TweenMax.from($('.scheduleBox'), 0.5, { y:10,opacity:'0',delay : 0.5}),
					TweenMax.fromTo('.scheduleBox .imgBox img', 1, {scale:1.2, y:"-50%"},{scale:1, y:"-50%",delay:0.5 })
		]);
		var Schedule = new ScrollScene({triggerElement: ".scheduleBox",triggerHook: 'onEnter'}).setTween(tweenSchedule).setClassToggle(".scheduleBox", "active").addTo(controller);
		
		var tweenConcept = new TimelineMax ()
				.add([
					TweenMax.from($('.conceptBox'), 0.5, { y:10, opacity:'0',delay : 0.5}),
					TweenMax.fromTo('.conceptBox .imgBox img', 1, {x:'-50%',scale:1.2},{x:'-50%',scale:1,delay:0.5 })
		]);
		
		var Concept = new ScrollScene({triggerElement: ".conceptBox h2",triggerHook: 'onEnter'}).setTween(tweenConcept).setClassToggle(".conceptBox", "active").addTo(controller);
		
		var tweenMap = new TimelineMax ()
				.add([
					TweenMax.from($('.courcemapBox'), 0.5, { y:10,opacity:'0',delay : 0.5}),
					TweenMax.fromTo('.courcemapBox .imgBox img', 1, {scale:1.2},{scale:1,delay:0.5 })
		]);
		
		var Map = new ScrollScene({triggerElement: ".courcemapBox h2",triggerHook: 'onEnter'}).setTween(tweenMap).setClassToggle(".courcemapBox", "active").addTo(controller);
		
		var tweenVA = new TimelineMax ()
				.add([
					TweenMax.from($('.volunteerBox'), 0.5, { y:10,opacity:'0',delay : 0.5}),
					TweenMax.from($('.aboutBox'), 0.5, { y:10,opacity:'0',delay : 0.5}),
					TweenMax.fromTo('.volunteerBox .imgBox img', 1, {scale:1.2},{scale:1,delay:1 }),
					TweenMax.fromTo('.aboutBox .imgBox img', 1, {scale:1.2},{scale:1,delay:1 })
		]);
		var VA = new ScrollScene({triggerElement:".volunteerBox",triggerHook: 'onEnter'}).setTween(tweenVA).setClassToggle(".vaBox", "active").addTo(controller);
		
		
		
		
	};

});


