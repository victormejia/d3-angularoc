Reveal.addEventListener('useanimate', function() {
	$('#needsomescale').addClass('animated rubberBand');
	$('#needsomescale').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
		$(this).removeClass('rubberBand');
	});
}, false );