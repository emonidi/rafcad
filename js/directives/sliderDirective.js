var app = angular.module('app',[function(){}]);


app.directive('ngSlider', ["$injector",function ($injector) {
	return {
		restrict: 'A',
		templateUrl:"./js/directives/sliderTemplate.html",
		link: function (scope, elem, attr) {		

			    $('head').append('<script type="text/javascript" src="./js/directives/modernizr.js"></script>');

				this.position;
				scope.activeLi = 0;
				scope.direction;
				scope.positions = new Array();
				scope.is3d = Modernizr.csstransforms3d;
				scope.parent = $(elem).find($("#carousel"));
				scope.ul = $(elem).find('ul');
				scope.parentWidth = function(){
					var parentWidth = $(scope.parent).width();
					return parentWidth;
				}

				scope.elementsNumber = function(){
					return $(elem).find('li').length;
				}

				
				scope.enableTouch = function(){
					var li =  scope.ul.find("li");
					$(".arrow").hide();
					$(li).swipe({
						swipe:function(event,direction,duration,fingerCount){
							direction === 'left' ? scope.forward() : null;
							direction === 'right' ? scope.back() : null;
						}
					})

				}

				scope.getPositions = function(){
					var elementsNumber  = scope.elementsNumber();
					console.log(elementsNumber)
					var parentWidth = this.parentWidth();
					for(var i = 0; i < elementsNumber+1; i++){
						scope.positions[i] = parentWidth*i;
					}
				}

				scope.resizeUl = function(){
						scope.ul.width(scope.parentWidth()*scope.parent.find("li").length);
				}

				scope.isTouch = function(){
					var useragent = navigator.userAgent;
					console.log(useragent.search("iPhone"));
					if(useragent.search("iPhone") > -1 || useragent.search("android") > -1){
						return true;
					}else{
						return false;
					}
				}


				

				
				scope.resizeLi = function(){
					var li = $(elem).find('li');
					console.log(parent);
					$(li).each(function(i,e){
						$(e).width(scope.parentWidth());
					})
				}
				
				scope.forward = function(){
				
					if((scope.elementsNumber()-1)*-1 === scope.activeLi){
						scope.activeLi = 0;
					}else{
						scope.activeLi = scope.activeLi-1;	
					}
					scope.animate(scope.activeLi);
				}

				scope.back = function(){
					if(scope.activeLi === 0){
						scope.activeLi = (scope.elementsNumber()-1)*-1;
					}else{
						scope.activeLi = scope.activeLi + 1;
					}
					scope.animate(scope.activeLi);
				}

				scope.animate= function(){
				    var aLi;
				    var position;
				    if(scope.activeLi > 0){
				    	aLi = scope.activeLi;
				    }else{
				    	aLi = scope.activeLi*-1;
				    }
					position = scope.positions[aLi];

					
					if(scope.is3d){
						scope.animate3d(position);
					}else{
						scope.animateLegacy(position);
					}
				}

				scope.animate3d = function(position){
					if(scope.activeLi > 0){
						var a = 1;
					}else{
						a= -1;
					}
					scope.ul.css({
						"-webkit-transition":".5s",
						"-moz-transition":".5s",
						"transition":".5s",
						"-webkit-transform":"translate3d("+position*a+"px,0,0)",
						"-moz-transform":"translate3d("+position*a+"px,0,0)",
						"transform":"translate3d("+position*a+"px,0,0)"
					});
					
				}

				scope.animateLegacy = function(position){
					if(scope.activeLi > 0){
						var a = 1;
					}else{
						a= -1;
					}

					scope.ul.animate({
						"margin-left":position*a+"px"
					})

				}

				scope.init = function(){
					scope.resizeUl();
					scope.getPositions();
					scope.resizeLi();		
				}

				$(window).on("resize",function(){
					scope.init();
				});
				console.log(scope.isTouch())
				if(attr.ngTouchenabled && scope.isTouch()){
			    	$('head').append('<script type="text/javascript" src="./js/directives/touchSwipe.js"></script>');
			    	scope.enableTouch();
			    }

				scope.init();
		}		
	};
}])