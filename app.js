

$(document).on('pageinit',function() {
	
	$("#fetch").click(function(){
	document.addEventListener("deviceready", onDeviceReady, false);
		var searchInput = $("#the-search-input").val();
		
		if(searchInput=="")
			{
				alert("Please enter location");
			}
		else
			{
			loadWeatherWebService(searchInput);
		
			}
			
			
		
	});

});

function onDeviceReady() {
    playAudio();
}

function playAudio() {
    // Play the audio file at url
    var my_media = new Media('/android_asset/www/testaudio.mp3',
        // success callback
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
    );
    // Play audio
    my_media.play();
}

function loadWeatherWebService(location)
{
	var htmlString="";
	$("#container").html("Updating weather details, please standby...");
	var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="+location+"&units=metric";	
	console.log(apiUrl);
	$.ajax({url:apiUrl,dataType:'jsonp',}).done(function(result){
		
		console.log(result);
		if(result.cod==200)
		{
		$('#statusMsg').text('Success!');
		$('#statusMsg').fadeIn('slow');
		var city = result.name;
		var country = result.sys.country;
		var dt = result.dt;
		var humidity  = result.main.humidity;
		var temp = Math.round(result.main.temp);
		var description= result.weather[0].description;
		
		var sunrise = new Date((result.sys.sunrise)*1000);
	    var sunriseHours = sunrise.getHours();
	    var sunriseMinutes = sunrise.getMinutes();
	    var sunset = new Date((result.sys.sunset)*1000);
	    var sunsetHours = sunset.getHours();
	    var sunsetMinutes = sunset.getMinutes();
        // will display time in 10:30:23 format
	    var sunriseFormattedTime = sunriseHours + ':' + sunriseMinutes;
	    var sunsetFormattedTime = (sunsetHours-12) + ':' + sunsetMinutes;
		
		var newdate = new Date(dt*1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var weekday = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
        var year = newdate.getFullYear();
        var month = months[newdate.getMonth()];
        var date = newdate.getDate();
		var formatteddate = weekday[newdate.getDay()] + ' ' + date + ' ' + month + ', ' + year;
		var icon = result.weather[0].icon;
		htmlString = htmlString + "<div id='location'>"+city +", "+ country+"</div>";
		//htmlString = htmlString + "<div id='location'>"+city +", "+ country+"<a href=media.html target=_blank ><img src=weather-icons/music.png alt=HTMLtutorial ></a></div>";
		//htmlString = htmlString + "<div id='location'>"+city +", "+ country+" <img id="audioicon" src=weather-icons/music.png alt="audiologo"></div>";
		htmlString = htmlString + "<div class='dayHeader'> <b>"+ formatteddate + " : "+ result.weather[0].main +"  <img src=weather-icons/"+icon+".png /></div>";
		htmlString = htmlString + "<div class='weatherData'> <b> Temperature: Curr "+temp  + " <sup>o</sup>C , Max "+  Math.round(result.main.temp_max) + " <sup>o</sup>C , Min "+  Math.round(result.main.temp_min) + " <sup>o</sup>C </div>";
		htmlString = htmlString + "<div class='weatherData'> <b> Sunrise: "+ sunriseFormattedTime+" AM , Sunset: "+ sunsetFormattedTime+" PM</div>";
		htmlString = htmlString + "<div class='weatherData'> <b> Description: "+description.substring(0,1).toUpperCase() + description.substring(1)+" , Humidity: "+ humidity + " </div>";
		
		myurl="fiveday.html?city=" + city + "&country=" + country;
		htmlString = htmlString + "<div class='fiveweatherData'> Do you want <a target=_fiveday_ href=" + myurl + "> 5 days weather</a> information? </div>";
		$("#container").html(htmlString);
		}
		else
			{
			$("#container").html("No data found.. Please check the city name and try again..");
			$('#statusMsg').css("background-color","rgba(176, 40, 26, 1)");
			$('#statusMsg').text('Sorry, no information found about that city, please try again!');
			$('#statusMsg').fadeIn('slow');
			}
		
		
		setTimeout(function() {			
		    $('#statusMsg').fadeOut('fast');
		}, 3000); 
	}).fail(function(){
		console.log("Error occured");
		$("#container").html("Internal Error occured. Please try again.");
				
	});	

}