//Page object
var Page = {
    
}

var tempScrollTop, currentScrollTop = 0;
var userScrolling = true;
var isLandingHidden = false;
var item = $('.img li');
var pointIndicator = $('.pagination li');
var num = 0;
var width = item.outerWidth();
var arrowLeft = $( ".arrowLeft" );
var arrowRight = $( ".arrowRight" );

//DOM
Page.DOM = function () {
    //dynamic elements events
}

function dateDiffYearsOnly( dateNew,dateOld) {
   function date2ymd(d){ w=new Date(d);return [w.getFullYear(),w.getMonth(),w.getDate()]}
   function ymd2N(y){return (((y[0]<<4)+y[1])<<5)+y[2]} // or 60 and 60 // or 13 and 32 // or 25 and 40 //// with ...
   function date2N(d){ return ymd2N(date2ymd(d))}

   return  (date2N(dateNew)-date2N(dateOld))>>9
}

//DOM load
Page.DOMLoad = function () {
    //todo
	var joiningDate = new Date('2016, 05, 30');
	$('#yearsOfExp').innerHTML = "" + dateDiffYearsOnly(new Date(), joiningDate) + "+";
}

//DOM change
Page.DOMChange = function () {
    //todo
}


//handlers
Page.mainReload = function () {
	$("footer").append("<div class='gif hidden'></div>");
	userScrolling = false;
	isLandingHidden = false;
	setTimeout(function() {
      Page.changeWords();
}, 8000);
	if (location.href.indexOf("?") !== -1) {
		var id = location.href.slice(location.href.indexOf("?")+1);
		var el = "[href=#"+id+"]";
		Page.scrollto(el);
	} else {
		$("html:not(:animated),body:not(:animated)").animate({scrollTop: 0}, 1);
		setTimeout(function() {
			userScrolling = true;
		}, 2);
	}
	setTimeout(function() {
		$("main").addClass("visible");
	}, 1);
}

Page.setLandingHeight = function () {
	$('.landing').attr('style', 'height:'+$(window).height().toString()+'px');
}

Page.changeWords = function () {
    var words = $(".landing h1 .words span");
    var i = 0;
    setInterval(function () {
        i = i < words.length - 1 ? i+1 : 0;
        words.removeClass("active");
        words.eq(i).addClass("active");
    }, 2000);
}

Page.scrollto = function (elem) {
	userScrolling = false;
	var elementClick = $(elem).attr("href");
	var destination;
	if (elementClick === '#about') {
		destination = $(elementClick).offset().top;
	}
	else if ($(document).width() <= 1366) {
		destination = $(elementClick).offset().top - 50;
	} else {
		destination = $(elementClick).offset().top - 90;
	}
	$("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
	setTimeout(function() {
		userScrolling = true;
	}, 1200);
}

Page.landingClose = function () {
	$("html:not(:animated),body:not(:animated)").animate({scrollTop: $('.welcome').offset().top}, 1100);
	isLandingHidden = true;
}

Page.scrollTop = function () {
	$("html:not(:animated),body:not(:animated)").animate({scrollTop:0}, 1100);
}

Page.menuClose = function () {
	$("nav").removeClass("active");
	$("nav").attr("style", "height:0");
	$(".scrollmenu").removeClass("open");
}

Page.menuOpen = function () {
	$("nav").addClass("active");
	if ($(window).width() > 767) {
		$("nav").attr("style", "height:60px");
	} else {
		$("nav").attr("style", "height:41px");
	}
	$(".scrollmenu").addClass("open");
}

Page.fullMenuClose = function () {
	$("nav").removeClass("active");
	$("nav").attr("style", "height:0");
	$(".scrollmenuExpanded").removeClass("open");
	$(".icoMenu").removeClass("active");
}

Page.fullMenuOpen = function () {
	$("nav").addClass("active");
	if ($(window).width() > 1024) {
		$("nav").attr("style", "height:250px");
	} else {
		$("nav").attr("style", "height:100%");
	}
	$(".scrollmenuExpanded").addClass("open");
}

Page.scrollActionMain = function () {
	var currentScrollTop = $(window).scrollTop();

	if (currentScrollTop === 0) {
		isLandingHidden = false;
		Page.menuClose();
	}

	//scrolling down
	if (tempScrollTop < currentScrollTop ) {
		
		if (!isLandingHidden) {
			isLandingHidden = true;
		} else {
			Page.menuClose();
			Page.fullMenuClose();
		}

	}
	//scrolling up
	if (tempScrollTop > currentScrollTop ) {

		Page.fullMenuClose();
		if (userScrolling && $(".gif").hasClass("hidden") && isLandingHidden) {
			if (!$(".scrollmenu").hasClass("open")) {
				if ($(".scrollmenuExpanded").hasClass("open")) {
					Page.menuOpen();
					Page.fullMenuClose();
				} else {
					Page.menuOpen();
				}
			} else {
				Page.menuOpen();
			}
		}
	}

	tempScrollTop = currentScrollTop;
}

Page.gifOpen = function () {
	$(".gif").removeClass("hidden");
	$(".gif").addClass("active");
}

Page.gifClose = function () {
	$(".gif").removeClass("active");
	$(".gif").addClass("hidden");
}

Page.portfolioReload = function () {
	for (i=0; i<$(".img li").length; i++) {
		$(".pagination").append("<li><span></span><div class='wrapper' data-anim='base wrapper'><div class='circle' data-anim='base left'></div><div class='circle' data-anim='base right'></div></div></li>");
	}
	$($(".pagination li")).first().addClass("active");
	$(".content").mCustomScrollbar({
        axis:"x",
        keyboard:{ enable: true }
    });

if ($(window).width()>1250) {
  $('.mCSB_scrollTools.mCSB_scrollTools_horizontal').css("width", $(".img li").width()); 
 }
 else if ($(window).width()>950 && $(window).width()<1250) {
  $('.mCSB_scrollTools.mCSB_scrollTools_horizontal').css("width", $(window).width()*0.667); 
 }
 else if ($(window).width()>720) {
  $('.mCSB_scrollTools.mCSB_scrollTools_horizontal').css("width", $(window).width()*0.892);
 } else {
  $('.mCSB_scrollTools.mCSB_scrollTools_horizontal').css("width", $(window).width()*0.875);
 }

	var margin = ($(window).width() - $('.mCSB_scrollTools.mCSB_scrollTools_horizontal').width())/2;
    $('.content ul li:first-child').css('margin-left',margin);
    $('.content ul li:last-child').css('margin-right',margin-parseInt($('.mCSB_draggerRail').css('border-right-width'), 10));

    $(".mCSB_scrollTools.mCSB_scrollTools_horizontal").css('margin-left', -$('.mCSB_scrollTools.mCSB_scrollTools_horizontal').width()/2)
}

Page.scrollActionPortfolio = function () {
	var currentScrollTop = $(window).scrollTop();

	//scrolling down
	if (tempScrollTop < currentScrollTop ) {
		Page.menuClose();
		Page.fullMenuClose();
	}
	//scrolling up
	if (tempScrollTop > currentScrollTop ) {

		Page.fullMenuClose();
		if (userScrolling) {
			if (!$(".scrollmenu").hasClass("open")) {
				if ($(".scrollmenuExpanded").hasClass("open")) {
					Page.menuOpen();
					Page.fullMenuClose();
				} else {
					Page.menuOpen();
				}
			} else {
				Page.menuOpen();
			}
		}
	}

	if (currentScrollTop === 0) {
		Page.menuClose();
	}

	tempScrollTop = currentScrollTop;
}

Page.changePoint = function (n) {
	$($(".pagination li")).removeClass('active');
	pointIndicator = $('.pagination li').eq(n);
	pointIndicator.replaceWith('<li class="active"><span></span><div class="wrapper" data-anim="base wrapper"><div class="circle" data-anim="base left"></div><div class="circle" data-anim="base right"></div></div></li>');
}

Page.slider = function (selector) {
	var obj = $(selector);
	var start, end;
	slideToLeft = function () {
		if (num > 0) {
				num--;
		}
		else if (num == 0) {
			num = item.length-1;
		}
	}
	slideToRight = function () {
		if (num < item.length-1) {
				num++;
		}
		else if (num == item.length-1) {
				num = 0;
		}
	}
	animateSlides = function () {
		var liMarginLeft = $(".slider .img li+li").css("margin-left");
		var addMargin = liMarginLeft.slice(0,liMarginLeft.length-2);
		var margin = num*(width + +addMargin);

		item.first().animate({ 'margin-left': "-" + margin + 'px' }, 300);
	}

	obj.on('click', '.arrow', function () {
		if ($(this).hasClass('arrowLeft')) {	
			slideToLeft();
		} else {
			slideToRight();
		}
		Page.changePoint(num);
		animateSlides();
	});

	obj.on('click', '.pagination li', function () {
		if (!$(this).hasClass('active')) {
			num = $(this).index();
		}
		Page.changePoint(num);
		animateSlides();
	});
	
	$('.slider .img').on('touchstart touchend', function (event) {
		event.preventDefault();
		event.stopPropagation();
		if (event.type == 'touchstart') {
			start = event.originalEvent.changedTouches[0];
		}
		if (event.type == 'touchend') {
			end = event.originalEvent.changedTouches[0];
			var xAbs = Math.abs(start.pageX - end.pageX);
			var yAbs = Math.abs(start.pageY - end.pageY);
			if (xAbs > 20 || yAbs > 20) {
				if (xAbs > yAbs) {
					if (end.pageX < start.pageX) {
						slideToRight();
						Page.changePoint(num);
					} else{
						slideToLeft();
						Page.changePoint(num);
					}
					animateSlides();
				} else {
					if (end.pageY < start.pageY) {
						$("html:not(:animated),body:not(:animated)").animate({scrollTop: 500}, 500);
					} else{
						$("html:not(:animated),body:not(:animated)").animate({scrollTop: 0}, 500);
					}
				}
			}
		}
		
	});

}

//events
$(document).ready(function () {
    Page.DOM();

	$('body').on("click", ".arrowHome", function(){
		userScrolling = false;
		Page.menuClose();
		Page.scrollTop();
		setTimeout(function() {
			userScrolling = true;
			isLandingHidden = false;
		}, 1200);

	})

	$('body').on("click", ".icoMenu", function(){
        if(!$(this).hasClass("active")) {
            $(this).addClass("active");
            Page.menuClose();
			Page.fullMenuOpen();
        }
        else{
            $(this).removeClass("active");
            Page.fullMenuClose();
			setTimeout(function() {
				Page.menuOpen();
			}, 10);
        }
		
	})

	$('body').on("click", ".scrollmenuExpanded", function(event){
		if (event.target.tagName != "UL") {
			$(".icoMenu").removeClass("active");
			Page.fullMenuClose();
			setTimeout(function() {
				Page.menuOpen();
			}, 10);
		}
	})

    //pageMain
	if ($("body").hasClass("pageMain")) {

		Page.setLandingHeight();

	    $('body').on("click", "a.scrollto", function(){
			Page.scrollto(this);
			isLandingHidden = true;
			return false;
		});

		$('body').on("click", ".go", function(){
			Page.landingClose();
		})

		$(window).on("scroll", function(){
			Page.scrollActionMain();
		})

		$('body').on("click", "footer .button", function(){
			Page.gifOpen();
		})

		$('body').on("click", ".gif", function(){
			Page.gifClose();
		})

		
		$(window).load(function(){
			Page.mainReload();
	   	})

	   	$(window).on("resize", function() {
	   		setTimeout(function() {
				Page.setLandingHeight();
			}, 1);	
		});

	}

   	//pagePortfolio
	if ($("body").hasClass("pagePortfolio")) {
		
		Page.slider(".slider");

		$(window).on("scroll", function(){
			Page.scrollActionPortfolio();
		})

		$(window).load(function(){
			Page.portfolioReload();
	   	})

	}

});

$(window).bind("load", function (e) {
    Page.DOMLoad();
});

$(window).bind("hashchange", function (e) {
    Page.DOMChange();
});
