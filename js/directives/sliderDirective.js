var app = angular.module('app',[function(){}]);

app.directive('ngSlider', [function () {
	return {
		restrict: 'A',
		templateUrl:"sliderTemplate.html",
		link: function (scope, elem, attr) {
			
		}
	};
}])