
var map;
var marker;
var markers=[];
var infowindow;
var places = [{
		 name: "Paci Restaurant",
		 loc: {lat: 41.143405, lng: -73.285961},
		},
		{
		 name: "Chips Restaurant",
		 loc: {lat: 41.178543, lng: -73.240930},
		},
		{
		 name: "Holiday Inn",
		 loc: {lat: 41.182853, lng: -73.182487}
		},
		{
		 name: "Rodeway Inn",
		 loc: {lat: 41.147831, lng: -73.129329},
		},
		{
		 name: "Little Barn",
		 loc: {lat: 41.152615, lng: -73.127059},
		},
		{
		 name: "Old Post Tavern",
		 loc: {lat: 41.148220, lng: -73.255118},
		}];


//initialize the map
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
	center: places[0].loc,
	zoom: 11
	});

	ko.applyBindings(new viewModel());


};


// function loadError()

// }

//extract the names of all the places into an array
// function locations(){
//  	var i;
//  	var locations = [];
// 	var length = places.length;
// 		for(i=0; i<length; i++){
// 			eachLocation = places[i].name;
// 			locations.push(eachLocation);
// 			}


// 	console.log(locations);
// 	return locations;
// };


//displaying markers when the map is loaded
function defaultMarkers(places){
		console.log(places);
		var i;
		// var contentString = "Hello";
		for(i=0; i<places.length;i++){
			marker = new google.maps.Marker({
			position: places[i].loc,
			animation: google.maps.Animation.DROP,
			map: map,
			draggable: false,
			title: places[i].name
			});

			places[i].marker = marker;
			markers.push(marker);

			infowindow = new google.maps.InfoWindow();
			marker.addListener('click', (function(marker){
				return function(){

					toggleBounce(marker);
					attachContent(marker);
				}
			}(marker)));

			marker.setMap(map);
		}
	};

function toggleBounce(marker){
	if (marker.getAnimation() != undefined) {
	 	marker.setAnimation(null);
	}
	else {
	  	marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}


function listClick(){
	google.maps.event.trigger(this.marker, 'click');
};
// var contentString
function attachContent(marker){
		//console.log(marker);
		var CLIENT_ID = "UZ10AIPRE0JSMOEEF5UXBSWVDC3XHU3J41XVP3LRJTBKY15X";
		var CLIENT_SECRET = "SHLSIMV4VEK3N3RRYHUJ0FYUQLHLBEO4C0FKASIPGHRTEPCZ";
		var fourSquareURL = "https://api.foursquare.com/v2/venues/search?client_id="+
		CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&ll=41.14,-73.24&query="+marker.title+"&v=20140806";
	    $.getJSON(fourSquareURL, function(data){
	    	var venue = data.response.venues[0];
	    	var address= venue.location.formattedAddress;
	    	var url = venue.url;


	    	var contentString = '<div id="iwbody">'+
	    	'<a href="'+url+'">website</a><br/>'+address[0]+'<br/>'+address[1]+'<br/>'+address[2]+'<br/><h3 id="phoneno">'+venue.contact.formattedPhone+'</h3><br/></div>';

	    	//console.log(data);
			infowindow.setContent(contentString);
			infowindow.open(map, marker);
	    	//return contentString;


	    }).error(function(e){
	        //alert('foursquare Articles Could Not Be Loaded');
	        infowindow.setContent('<div style="color:black">Sorry!! Cannot load the address</div>');
	        infowindow.open(map, marker);
	    });
	};

	// marker.addListener("click", function(){
	// 	infowindow.open(marker.get('map'), marker);
	// });



function viewModel(){
	var self= this;
	self.markers = ko.observableArray(markers);
	//self.locations = ko.observableArray(locations());
	self.places = ko.observableArray(places);

	self.query =  ko.observable('');

	self.places = ko.computed(function() {
        var search = self.query().toLowerCase();

        return ko.utils.arrayFilter(places, function(place) {
            	return place.name.toLowerCase().indexOf(search) >= 0;
        });
     }, self);



	self.displayMarkers = defaultMarkers(self.places());

	self.listToMarkerAnimation = listClick(self.displayMarkers);

	self.clearMarkers = function(map, markers){
		for(var i = 0; i < markers.length; i++){
			markers[i].setMap(null);
		}
	};
	self.showMarkers = function(map, markers){
		for(var i = 0; i < markers.length; i++){
			markers[i].marker.setMap(map);
		}
	}

	self.sub = self.query.subscribe(function(){
		self.clearMarkers(map, markers);
		self.showMarkers(map, self.places());
	});

};






































