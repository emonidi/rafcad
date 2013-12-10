var app = angular.module('app',[function(){}]);

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
app.directive('ngSlider', [function () {
	return {
		restrict: 'A',
		templateUrl:"./js/directives/sliderTemplate.html",
		link: function (scope, elem, attr) {

			$("head").append("<script type='text/javascript' src='./js/directives/modernizr.js'></script>");
			console.log(Modernizr);
			var transforms  = Modernizr.csstransforms3d;

			scope.activeLi = 0;

			var childrenCount = $(elem).find('li').length;

			var ul = $(elem).find('ul');
			var position = 0;
			scope.segmentWidth = function(){
				return $($(elem).find("li")[0]).width();
			}

			
			

			$(window).load(function(){
				var segmentWidth = scope.segmentWidth();
				$(elem).find('ul').css({
				"height":"420px",

				"width":scope.segmentWidth()*childrenCount+"px"
			});

				var li = $(ul).find("li");
				$(li).each(function(i,e){
					console.log(e);
					$(e).width(segmentWidth-1);
					//$(e).find("img").width(window.width);
				});
			})

							var margin =  0;

			scope.forward = function(){

				if(scope.activeLi === childrenCount){
					scope.activeLi = 0;

				}else{
					scope.activeLi = scope.activeLi+1;
				}
				scope.animate(scope.activeLi,1);
			}

			scope.back = function(){
				if(scope.activeLi === 0){
					return false;
				}else{
					scope.activeLi= scope.activeLi-1;
				}
				scope.animate(scope.activeLi,-1);
			}

			scope.animate = function (activeLi,d){

				var $ul = $(ul);
				var segmentWidth = scope.segmentWidth();
				position = activeLi*segmentWidth;
				var step= segmentWidth/30;
				//return false;
				var now = new Date().getTime();
				var delta; 
				var then = new Date().getTime();
				console.log(margin);
				//console.log(position+" =====   "+margin);
			//	return false;
			var update  = 	function(transformsType){
					now = new Date().getTime();
					delta  = (now - then)/1000;
					margin = margin+(step*-1)// Math.ceil(margin+(delta*position*-1));
					if(margin < position*-1){
						margin = position*-1;
						window.cancelAnimationFrame(update);
					}else{
						console.log(margin)
						window.requestAnimationFrame(update);

					}

				then = now;
				scope.updateMargin($ul,margin)
				

				}

				update();

				

			}

			scope.updateMargin = function($ul,margin){
				//$ul[0].style.marginLeft = margin+"px";
				transforms ? $($ul).css("-webkit-transform","translate3d("+margin+"px,0,0)") : $ul[0].style.marginLeft = margin+"px";
			}

		}	
	};
}])