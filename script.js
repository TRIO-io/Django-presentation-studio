var searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
var workUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles=';
var workUrl2 = '&prop=revisions&rvprop=content&format=json&formatversion=2';

function doStuff(){
	var title = $('#q').val();
	console.log(title);
	var url = searchUrl + title;
	
	url = url.replace(" ", "%20");
	console.log(url);
	$.ajax({
		url: url,
		jsonp: "callback",
	    dataType: "jsonp",
		success: function(data){
			gotData(data[1]);
		}
	});
}

function gotData(data){
	for (var n in data){
		$("ol").append("<li>"+ data[n] + "</li>");
	}
	$( "li" ).click(function() {
		var text = $( this ).text();
		console.log(text);
		var contentUrl = workUrl + text + workUrl2;
		console.log(contentUrl);
		$.ajax({
			url: contentUrl,
			jsonp: "callback",
		    dataType: "jsonp",
			success: function(data){
				console.log(data);
				$("#content").append("<p>"+ data["query"]["pages"][0]["revisions"][0]["content"] + "</p>");
			}
		});
	});	
}
