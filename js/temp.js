$(document).ready(function(){
	$(".menu-button").on("click",function(ev){
		ev.preventDefault();
		$("#menu").toggleClass("opened");
		$("#content").toggleClass("moved");
	});
});