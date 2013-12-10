var app = angular.module('app',[function(){}]);


app.directive('ngSlider', [function () {
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

				this.parentWidth = function(){
					var parentWidth = $(scope.parent).width();
					return parentWidth;
				}
				

				this.getPositions = function(){
					var elementsNumber = $(elem).find('li').length;
					var parentWidth = this.parentWidth();
					for(var i = 0; i < elementsNumber+1; i++){
						scope.positions[i] = parentWidth*i;
						console.log(scope.positions);
					}
				}

				this.resizeUl = function(){
						scope.ul.width(this.parentWidth()*scope.parent.find("li").length);
				}

				this.resizeUl();

				this.getPositions();


				this.resizeLi = function(){
					var li = $(elem).find('li');
					console.log(parent);
					$(li).each(function(i,e){
						console.log($(e).width(parentWidth));
					})
				}

				scope.forward = function(){
					scope.activeLi = scope.activeLi-1;

					scope.animate(scope.activeLi);
				}

				

				scope.back = function(){
					console.log(scope.aLi)
					scope.activeLi = scope.activeLi + 1;
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
				    console.log(aLi);
					position = scope.positions[aLi];
					console.log(position)

					
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
					console.log(position*a);
					scope.ul.css({
						"-webkit-transition":".5s",
						"-webkit-transform":"translate3d("+position*a+"px,0,0)"
					});
					
				}



				this.resizeLi();		
		}		
	};
}])