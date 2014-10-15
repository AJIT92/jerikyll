
$(document).ready(function() {
	$(".btn-bibtex").click(function() {
		$("#" + $(this).data()["link"]).toggle(100);
		
		return false;
	})
});
