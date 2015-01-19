
$(document).ready(function() {
	var postTimestamp = $("#post-timestamp");
	if (postTimestamp.length === 1) {
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var postTimestampUtc = $("meta[itemprop=datePublished]").attr("content");
		var utcDate = new Date(postTimestampUtc);

		postTimestamp.html(months[utcDate.getMonth()] + " " + utcDate.getDate() + ", " + utcDate.getFullYear());
		postTimestamp.attr("title", utcDate);
	}
});
