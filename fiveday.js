
$(document).on('pageinit',function(){

    $('.ui-btn-active').on('click', function(event) {
    event.preventDefault(); 
    var url = $(this).data('target');
    location.replace(url);
});
	
	var url = $(location).attr('href'); //get current url
	var decodedUrl = decodeURIComponent(url);
	//$("#container").html("URL:" + url);
	myargs=decodedUrl.split("?")[1];
	//alert(myargs);
	mycity=myargs.split("&")[0].split("=")[1];
	mycountry=myargs.split("&")[1].split("=")[1];
	//alert(mycity);
	//alert(mycountry);
	console.log(decodedUrl);	
	loadWeatherWebService(mycity,mycountry);
});

function loadWeatherWebService(location,country){
	var htmlString="";
	var apiUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+location+","+country+"&units=metric&cnt=5";	
	console.log(apiUrl);
	$.ajax({url:apiUrl,dataType:'jsonp',}).done(function(result){
		
		console.log(result);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var weekday = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
		if(result.cod==200)
		{
			var city = result.city.name;
			var country = result.city.country;
			var count=result.cnt;
			var date = [];
			var maindesc = [];
			var description = [];
			var humidity = [];
			var min_temp = [];
			var max_temp = [];
			var speed = [];
			var icon = [];
			htmlString = "<div id='location'>"+city +", "+ country+"</div>";
			
			for (var i=0;i < count; i++){
				date[i]= new Date(1000*result.list[i].dt);
				maindesc[i]=result.list[i].weather[0].main;
				description[i]=result.list[i].weather[0].description;
				icon[i]=result.list[i].weather[0].icon;
				humidity[i]=result.list[i].humidity;
				min_temp[i]=result.list[i].temp.min;
				max_temp[i]=result.list[i].temp.max;
				speed[i]=result.list[i].speed;
			
			
			  
				htmlString = htmlString + "<div class='dayHeader'> <b>"+weekday[date[i].getDay()]+" "+date[i].getDate()+" "+months[date[i].getMonth()]+" : "+ maindesc[i] +"  <img src=weather-icons/"+icon[i]+".png /></div>";
				htmlString=htmlString+ "<div class='weatherData'> <b> Temp : "+ max_temp[i]+" <sup>o</sup>C (max), "+ min_temp[i]+" <sup>o</sup>C (min)</div>";				
				htmlString= htmlString+ "<div class='weatherData'> <b>Description: "+description[i]+" , Humidity:"+ humidity[i]+"</div>";
				htmlString= htmlString+ "<div class='weatherData'> <b>Wind Speed: "+speed[i]+" mps</div>";
				
			}
			$("#container").html(htmlString);
		}
		else
		{
			$("#container").html("No data found.. Please check the city name and try again..");
		}
				setTimeout(function() {			
		    $('#statusMsg').fadeOut('fast');
		}, 3000); 
	}).fail(function(){
		console.log("Error occured");
		$("#container").html("Internal Error occured. Please try again.");
				
	});	
}		