/*
 * Twitter Filter Streaming API
 * Takes in the Longitude and Latitude of the location entered 
 *
 */
	var toronto;
	var sanfran;
	var newyork;
	var stats;
	var tweetcount = 0;
	var city = toronto;
	var Firebase = require("firebase");
	var FirebaseStats = new Firebase("https://boiling-inferno-5804.firebaseio.com");
	var TheFireBase = new Firebase("https://hackprinceton123.firebaseio.com/");
	var FireBaseTO = new Firebase("https://hackprinceton123.firebaseio.com/toronto");
	var FireBaseNY = new Firebase("https://hackprinceton123.firebaseio.com/newyork");
	var FireBaseSF = new Firebase("https://hackprinceton123.firebaseio.com/sanfran");
	var FireBaseLO = new Firebase("https://hackprinceton123.firebaseio.com/london");
	var TwitterInfo = new Firebase("https://tweetinfo.firebaseio.com/");

	//read the data located at FireBase database
	FireBaseTO.once('value', function(snapshot) {
	  // handle read data.
		toronto = snapshot.val();
		if (city == "Toronto" || city == "toronto") {
			calculateTweet(toronto);
		}
	});
	FireBaseNY.once('value', function(snapshot) {
		// handle read data.
		newyork = snapshot.val();
		if (city == "New York" || city == "new york") {
			calculateTweet(newyork);
		}
	});
	FireBaseSF.once('value', function(snapshot) {
	  	// handle read data.
	  	sanfran = snapshot.val(); 
	  	if (city == "San Francisco" || city == "san francisco") {
	  		calculateTweet(sanfran);
		}
	});
	FireBaseLO.once('value', function(snapshot) {
		// handle read data.
		var london = snapshot.val();
		if (city == "London" || city == "london") {
			calculateTweet(london);
		} 
	});


	FirebaseStats.once("value", function(snapshot) {
	    var stats = snapshot.exportVal();
	});

	function calculateTweet(city) {
		var Twit = require('twit');
		var T = new Twit({
	    consumer_key:         'FzGFzMkwMhSFFnW5PWTdU9DwR',
	    consumer_secret:      'sunQLNgysY9XiYiVpG5OQ3vfTPa11CrrIwDxPDm6xuXsqGRBkO',
	    access_token:         '448139046-ZFvpmJ7vqwjAJnKAVvXUHoXudlzyPpq2chYUfxzp',
	    access_token_secret:  '72XKoQTCyZ15kIBIlx1luin7t1f2OrRxcdoa5WhjsBxTg'
		});


		/* Streaming API - Real time search */
		var filter_stream = T.stream('statuses/filter', { locations:[-122.751062, 37.408549, -122.339772 ,37.836376, -74,40,-73,41, -79.485129, 43.614420, -79.294386, 43.724860, -74.671759, 40.328201, -74.632701, 40.369331, -0.444099, 51.297638, 0.222823, 51.720701] });

		var location = TheFireBase.city;
		var attraction = (city.val1);

		var attraction2 = attraction.toLowerCase().replace(/\s/gi, "_");

		filter_stream.on('tweet', function (tweet) {
			if (tweet.text.indexOf(city.val1) >= 0) {
				console.log(tweet.text + "\n");
				tweetcount ++;
				TwitterInfo.push({
					tweets: { tweet },
					attraction: { attraction },
						})
				FirebaseStats.push({
					attraction: attraction2,
					TweetCounter: tweetcount,
					})
			};
			if (tweet.text.indexOf(city.val2) >= 0) {
				console.log(tweet.text + "\n");
				TwitterInfo.push({
					tweets: { tweet },
					attraction: { attraction },
						})
				FirebaseStats.push({
					attraction: attraction2,
					TweetCounter: tweetcount,	
					})
			};	
			if (tweet.text.indexOf(city.val3) >= 0) {
				console.log(tweet.text + "\n");
				tweetcount ++;
				TwitterInfo.push({
					tweets: { tweet },
					attraction: { attraction },
						})
				FirebaseStats.push({
					attraction: attraction2,
					TweetCounter: tweetcount,	
					})
			};	
			if (tweet.text.indexOf(city.val4) >= 0) {
				console.log(tweet.text + "\n");
				tweetcount ++;
				TwitterInfo.push({
					tweets: { tweet },
					attraction: { attraction },
						})
				FirebaseStats.push({
					attraction: attraction2,
					TweetCounter: tweetcount,	
					});	
			};
			if (tweet.text.indexOf(city.val5) >= 0) {
				console.log(tweet.text + "\n");
				tweetcount ++;
				TwitterInfo.push({
					tweets: { tweet },
					attraction: { attraction },
						})
				FirebaseStats.push({
					attraction: attraction2,
					TweetCounter: tweetcount,	
					})
			};
		return;
		});
	}
}


}