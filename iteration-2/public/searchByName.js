function showLink(name) {
	var links = {"Yellowstone":"yellowstone_info",
		       "Yosemite":"yosemite_info","Death Valley":"DeathValley_info","Crater Lake":"CraterLake_info"
		      };
	if (links.hasOwnProperty(name)) {
		document.getElementById("link").innerHTML = 'Park Info Page: <a href="' + links[name] + '">' + name + "</a>";
 	} else {
    	document.getElementById("link").innerHTML = '';
    }
}

function showResult(response){
	console.log(response);
	document.getElementById('fullName').textContent = "Full name: " + response.data[0].fullName;
	document.getElementById('description').textContent = "Description: " + response.data[0].description;
	document.getElementById('weatherInfo').textContent = "Weather: " + response.data[0].weatherInfo;
	document.getElementById('url').textContent = "Official website: " + response.data[0].url;
	showLink(response.data[0].name);
}
function bindButtons(){
	document.getElementById('parkSubmit').addEventListener('click', function(event){
	 var parkname = document.getElementById('parkName').value.toLowerCase();
	  var parkCode = "x";
	
	  if(parkname == "yellowstone"||parkname == "yellowstone national park")
			parkCode = "yell";
	  if(parkname == "yosemite national park" ||parkname == "yosemite")
			parkCode ="yose";
	  if(parkname == "grand canyon national park" ||parkname == "grand canyon")
			parkCode ="grca";  
	  if(parkname == "glacier national park" ||parkname == "glacier")
			parkCode ="glac"; 
	  if(parkname == "zion national park" ||parkname == "zion")
			parkCode ="zion"; 
	  if(parkname == "grand teton national park" ||parkname == "grand teton")
			parkCode ="grte";
	  if(parkname == "rocky mountain national park" ||parkname == "rocky mountain")
			parkCode ="romo";
	  if(parkname == "death valley national park" ||parkname == "death valley")
			parkCode ="deva";
	  if(parkname == "crater lake national park" ||parkname == "crater lake")
			parkCode ="crla";
  
	  if (parkCode == "x"){
		document.getElementById('notFound').textContent = "No results found."; 
		document.getElementById('fullName').textContent = "";
		document.getElementById('description').textContent = "";
		document.getElementById('weatherInfo').textContent = "";
		document.getElementById('url').textContent = "";
		alert("Input is not valid!");
		
	  }else{
		  document.getElementById('notFound').textContent = "";
		  var url = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=cE3RsWhn9rTIh4at0vewy7z7Lxgstlcpckp0F8Ce";
		  var req = new XMLHttpRequest();
		  req.open("GET", url, true);
		  req.addEventListener('load',function(){
		  if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			showResult(response);
		  } else {
			console.log("Error in network request: " + req.statusText);
		  }});
		  req.send(null);
	  }
	  event.preventDefault();
	  });
	  
  }
  
document.addEventListener('DOMContentLoaded', bindButtons);