
var map;
var marker;
var markers=[];
var infowindow;
var places = [{
		 name: "Paci Restaurant",
		 loc: {lat: 41.143405, lng: -73.285961},
		 address: ["Governor John Davis Lodge Turnpike", "Southport", "CT"]
		},
		{
		 name: "Chips Restaurant",
		 loc: {lat: 41.178543, lng: -73.240930},
		 address: ["525 Tunxis Hill Cut Off", "Fairfield", "CT"]
		},
		{
		 name: "Holiday Inn",
		 loc: {lat: 41.182853, lng: -73.182487},
		 address: ["1070 Main St", "Bridgeport", "CT"]
		},
		{
		 name: "Rodeway Inn",
		 loc: {lat: 41.147831, lng: -73.129329},
		 address: ["10 Washington Pkwy", "Stratford", "CT"]
		},
		{
		 name: "Little Barn",
		 loc: {lat: 41.152615, lng: -73.127059},
		 address: ["1050 Post Rd E", "Westport", "CT"]
		},
		{
		 name: "Old Post Tavern",
		 loc: {lat: 41.148220, lng: -73.255118},
		 address: ["1418 Post Rd", "Fairfield", "CT"]
		}];


//initialize the map
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
	center: places[0].loc,
	zoom: 11
	});

	ko.applyBindings(new viewModel());

};

//extract the names of all the places into an array
function locations(){
 	var i;
 	var locations = [];
	var length = places.length;
		for(i=0; i<length; i++){
			eachLocation = places[i].name;
			locations.push(eachLocation);
			}


	console.log(locations);
	return locations;
};


//displaying markers when the map is loaded
function defaultMarkers(locations){
		console.log(locations);
		var i;

		for(i=0; i<locations.length;i++){
			marker = new google.maps.Marker({
			position: places[i].loc,
			animation: google.maps.Animation.DROP,
			map: map,
			title: locations[i]
			});

			places[i].marker = marker;

			marker.addListener('click', (function(marker){
				return function(){
					toggleBounce(marker);
					getFourSquare(marker.title);
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
	//marker = this.marker;
	google.maps.event.trigger(this.marker, 'click');
};

function getFourSquare(place){
	var CLIENT_ID = "UZ10AIPRE0JSMOEEF5UXBSWVDC3XHU3J41XVP3LRJTBKY15X";
	var CLIENT_SECRET = "SHLSIMV4VEK3N3RRYHUJ0FYUQLHLBEO4C0FKASIPGHRTEPCZ";
	var fourSquareURL = "https://api.foursquare.com/v2/venues/search?client_id="+
	CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&ll=41.14,-73.24&query="+place+"&v=20140806&m=foursquare";
    $.getJSON(fourSquareURL, function(data){
    	console.log(data);

    }).error(function(e){
        alert('foursquare Articles Could Not Be Loaded');
    });

}

function viewModel(){
	var self = this;
	self.locations = ko.observableArray(locations());
	self.places = ko.observableArray(places);
	self.displayMarkers = defaultMarkers(self.locations());
	self.listToMarkerAnimation = listClick(self.displayMarkers);
	// self.getInfoData = getFourSquare();
	// self.markerClick = function(marker) {
	// 	google.maps.event.trigger(marker, 'click', marker);
	// };
	//self.markerAnimation = markerAnimation();
};








































