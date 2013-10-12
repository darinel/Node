var req;
var type;
var title;
var json;

function validateForm() {
	title  = document.getElementById("title").value;
	var para = document.getElementById("type").selectedIndex;
	type = document.getElementById("type").options[para].value;
	if(!title) {
		alert("Please enter something in the Title box");
		return false;
	}
	title = title.replace(/\s/g,"+");
	//make the XMLHttpRequest
	var url = "http://cs-server.usc.edu:26464/examples/servlet/HelloWorldExample?title="+title+"&type="+type;
	loadXMLDoc(url);
	//alert(url);	
	return true;
}

function loadXMLDoc(url) {
	req = false;
	//branch for native XMLHttpRequest object
	if (window.XMLHttpRequest) {
		try {
			req = new XMLHttpRequest();
		} catch (e) {
			req = false;
		}
	} else if(window.ActiveXObject){
		try {
			req = new ActiveXObject("Msxm12.XMLHTTP"); 
		} catch (e) {
			try {
				req = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				req = false;
			}
		}
	}
	if(req) {
		document.getElementById("table").innerHTML = "<br><div align='center'><img src='http://www-scf.usc.edu/~caoyang/loading.gif'></div>";
		req.open("GET",url, true);
	    req.send(null);
	    req.onreadystatechange = myCallback;
	}
}

function myCallback() {
	var content = "";
	//only if req show "loaded"
	if(req.readyState == 4) {
		//only if "ok"
		if(req.status == 200) {
			json = eval('(' + req.responseText + ')');
			var num = json.results.result.length;
			if(num == 0) {
				content += "<h1 align = 'center'><b> No discography found! </b></h1><br>";	
			} else {
				title = title.replace(/\+/g, " ");
				content += "<h2 align = 'center'>Displaying "+num+" results for "+title.toUpperCase()+"</h2>";
				content += printTable(json, num);
			}
			document.getElementById("table").innerHTML = content;	
		}else {
			alert("Error: wrong in retrieve the XML data:\n" + req.statusText);
		}
	}
}
function printTable (json, num) {
	var tableContent;
	if(type == "artists") {
		tableContent = "<table border=1 width=830><tr><th width=150>Cover</th><th width=150>Name</th><th width=150>Genre(s)</th><th width=150>Year</th><th width=100>Details</th><th width=130>Post To Facebook</th></tr>";
		for(i = 0; i < num; i++) {
			var	cover = json.results.result[i].cover;
			cover = encodeURI(cover);
			var	name = json.results.result[i].name;
			var genre = json.results.result[i].genre;
			var year = json.results.result[i].year;
			var details = json.results.result[i].details;
			tableContent += "<tr align='center'><td align='center' width=150><img src='"+cover+"' width=130 height= 130></img></td><td width=150>"+name+"</td><td width=150>"+genre+"</td><td width=150>"+year+"</td><td width=100><a href='"+details+"' target='_blank'>details</a></td><td><img src='http://www-scf.usc.edu/~caoyang/fb.jpg' class=fb height=40 width=100 onClick='postFB("+i+")'></img></td></tr>";
		}
	} else if(type == "albums") {
		tableContent = "<table border=1 width=930><tr><th width=150>Cover</th><th width=150>Title</th><th width=150>Artist</th><th width=150>Genre(s)</th><th width=100>Year</th><th width=100>Details</th><th width=130>Post To Facebook</th></tr>";
		for(i = 0; i < num; i++) {
			var	cover = json.results.result[i].cover;
			cover = encodeURI(cover);
			var	title = json.results.result[i].title;
			var	artist = json.results.result[i].artist;
			var genre = json.results.result[i].genre;
			var year = json.results.result[i].year;
			var details = json.results.result[i].details;
			tableContent += "<tr align='center'><td align='center' width=150><img src='"+cover+"' width=130 height=130></img></td><td width=150>"+title+"</td><td width=150>"+artist+"</td><td width=150>"+genre+"</td><td width=100>"+year+"</td><td width=100><a href='"+details+"' target='_blank'>details</a></td><td><img src='http://www-scf.usc.edu/~caoyang/fb.jpg' class=fb height=40 width=100 onClick='postFB("+i+")'></img></td></tr>";
		}
	} else {
		tableContent = "<table border=1 width=830><tr><th width=150>Sample</th><th width=150>Title</th><th width=150>Performer</th><th width=150>Composer</th><th width=100>Details</th><th width=130>Post To Facebook</th></tr>";
		for(i = 0; i < num; i++) {
			var	sample = json.results.result[i].sample;
			sample = encodeURI(sample);
			var	title = json.results.result[i].title;
			var	performer = json.results.result[i].performer;
			var composer = json.results.result[i].composer;
			var image = json.results.result[i].image;
			var details = json.results.result[i].details;
			if(sample == "N/A") {
				tableContent += "<tr align='center'><td align='center' width=150><img src="+image+" width=130 height=130></img></td><td width=150>"+title+"</td><td width=150>"+performer+"</td><td width=150>"+composer+"</td><td width=100><a href='"+details+"' target='_blank'>details</a></td><td><img src='http://www-scf.usc.edu/~caoyang/fb.jpg' class=fb height=40 width=100 onClick='postFB("+i+")'></img></td></tr>";
			} else {
				tableContent += "<tr align='center'><td align='center' width=150><a href="+sample+" target='_blank'><img src="+image+" width=130 height=130></img></a></td><td width=150>"+title+"</td><td width=150>"+performer+"</td><td width=150>"+composer+"</td><td width=100><a href='"+details+"' target='_blank'>details</a></td><td><img src='http://www-scf.usc.edu/~caoyang/fb.jpg' class=fb height=40 width=100 onClick='postFB("+i+")'></img></td></tr>";
			}
		}
	}
	tableContent += "</table>";
	return tableContent;
}

function postFB(index) {
	window.fbAsyncInit();
	var object = ojectCreat(index);
	function postActive(response) {
		if (response && response.post_id) {
		alert('Post was published.');
		} else {
		alert('Post was not published.');
		}
	}
	FB.ui(object, postActive);
}

function ojectCreat(index) {
	var object;
	if(type == "artists") {
		var	cover = json.results.result[index].cover;
		//cover = encodeURI(cover);
		var	name = json.results.result[index].name;
		var genre = json.results.result[index].genre;
		var year = json.results.result[index].year;
		var details = json.results.result[index].details;
		//year and genre are optional, image has been set
		var append = "";
		if(year != "N/A") {
			append = " who is active since "+year;
		}
		if( genre == "N/A") {
			object = {
				method: 'feed',
				name: name,
				picture: cover,
				link: details,
				caption: "I like "+name+append,
				description: "Find on AllMusic",
				properties:{
					"Look at details":{text:"here","href":details}
				}
			};
		} else {
			object = {
				method: 'feed',
				name: name,
				picture: cover,
				link: details,
				caption: "I like "+name+append,
				description: "Genre of Music is : "+genre,
				properties:{
					"Look at details":{text:"here","href":details}
				}
			};
		}
	} else if ( type == "albums") {
		var	cover = json.results.result[index].cover;
		//cover = encodeURI(cover);
		var	title = json.results.result[index].title;
		var artist = json.results.result[index].artist;
		var genre = json.results.result[index].genre;
		var year = json.results.result[index].year;
		var details = json.results.result[index].details;
		// only year is optional and image has be set
		var append = "";
		if(year != "N/A") {
			append = " released in "+year;
		}
		object = {
			method: 'feed',
			name: name,
			picture: cover,
			link: details,
			caption: "I like "+title+append,
			description: "Artist : "+artist+", Genre : "+genre,
			properties:{
				"Look at details":{text:"here","href":details}
			}
		};
	} else {
		var	sample = json.results.result[index].sample;
		//sample = encodeURI(sample);
		var	title = json.results.result[index].title;
		var	performer = json.results.result[index].performer;
		var composer = json.results.result[index].composer;
		var image = json.results.result[index].image;
		var details = json.results.result[index].details;
		// song link is optional but not used here, performer and composer are optional
		var append = "";
		if(composer != "N/A") {
			append = " composed by "+composer;
		}
		if(performer == "N/A") {
			object = {
				method: 'feed',
				name: title,
				picture: image,
				link: details,
				caption: "I like "+title+append,
				description: "Find on AllMusic",
				properties:{
					"Look at details":{text:"here","href":details}
				}
			};
		} else {
			object = {
				method: 'feed',
				name: title,
				picture: image,
				link: details,
				caption: "I like "+title+append,
				description: "Performer : "+performer,
				properties:{
					"Look at details":{text:"here","href":details}
				}
			};
		}
	}
	return object;
}







