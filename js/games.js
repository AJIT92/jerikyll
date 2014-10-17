
$(document).ready(function() {
	$("#gameSelect").bind("slid.bs.carousel", function(e) {
		updateSelectedGame();
	});

	updateSelectedGame();
});

function setSelectedGame(imgArr, info) {
	$("#game-info").html(info.replace(/\n\n/g, "<br /><br />"));

	$('#game-thumbs').html("");

	var imgCount = imgArr.length;
	
	for (var i = 0; i < imgCount; ++i) {
		var img = imgArr[i];
		$('#game-thumbs').append(
			'<div class="col-xs-12 col-sm-6 col-md-4">' +
				'<a class="image-zoom" href="' + img + '"><img class="game-thumb" src="' + img + '" /></a>' +
			'</div>'
		);
	}

	$('.image-zoom').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom',
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300
		}
	});

}

function updateSelectedGame() {
	var data = $(".item.active").data();

	setSelectedGame(data["imgArr"], data["info"]);
}
