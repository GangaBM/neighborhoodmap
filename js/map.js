
var map;
var model = [{
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



function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
	center: model[0].loc,
	zoom: 11
	});

	ko.applyBindings(new viewModel());

};

function displayLocations(){
 	var i;
 	var locations = [];
	var length = model.length;
		for(i=0; i<length; i++){
			eachLocation = model[i].name;
			locations.push(eachLocation);
			}
	console.log(locations);
	return locations;
};

var marker;
function defaultMarkers(locations){
		console.log(locations);
		var i;
		var markers=[];
		for(i=0; i<locations.length;i++){
			for(j=0; j<model.length; j++){
				if(locations[i] === model[j].name){
					marker = new google.maps.Marker({
					position: model[j].loc,
					//animation: google.maps.Animation.DROP,
					map: map,
					title: model[i].name
					});
					marker.addListener('click', toggleBounce);
					markers.push(marker);
					marker.setMap(map);
				}
			}
		}
		function toggleBounce() {
		  if (this.getAnimation() != null) {
		  	console.log(this.title+"one");
		  	console.log(this.getAnimation());
			    this.setAnimation(null);
		  } else {
	  		  console.log(this.title+"two");
	  		  this.setAnimation(google.maps.Animation.BOUNCE);
			  }
		}


};




// function markerAnimation(locations){
// 	var length = locations.length;
// 	var name = this;
// 	google.maps.event.addDomListener(this, 'click', function() {


// 	});


// };


function viewModel(){
	var self = this;
	self.locations = ko.observableArray(displayLocations());
	self.displayMarkers = defaultMarkers(self.locations());

	//self.markerAnimation = markerAnimation();


};










































//-------------------------------------------
// var map;
// var model = {

// 	restaurants: [
// 		{
// 		 name: "Paci Restaurant",
// 		 loc: {lat: 41.143405, lng: -73.285961},
// 		 address: ["Governor John Davis Lodge Turnpike", "Southport", "CT"]
// 		},
// 		{
// 		 name: "Chips Restaurant",
// 		 loc: {lat: 41.178543, lng: -73.240930},
// 		 address: ["525 Tunxis Hill Cut Off", "Fairfield", "CT"]
// 		}],

// 	hotels: [
// 		{
// 		 name: "Holiday Inn",
// 		 loc: {lat: 41.182853, lng: -73.182487},
// 		 address: ["1070 Main St", "Bridgeport", "CT"]
// 		},
// 		{
// 		 name: "Rodeway Inn",
// 		 loc: {lat: 41.147831, lng: -73.129329},
// 		 address: ["10 Washington Pkwy", "Stratford", "CT"]
// 		}],

// 	bars_and_pubs: [
// 		{
// 		 name: "Little Barn",
// 		 loc: {lat: 41.152615, lng: -73.127059},
// 		 address: ["1050 Post Rd E", "Westport", "CT"]
// 		},
// 		{
// 		 name: "Old Post Tavern",
// 		 loc: {lat: 41.148220, lng: -73.255118},
// 		 address: ["1418 Post Rd", "Fairfield", "CT"]
// 		}]
// };



// function initMap(){
// 	map = new google.maps.Map(document.getElementById('map'), {
// 	center: model.restaurants[0].loc,
// 	zoom: 11
// 	});

// 	ko.applyBindings(new viewModel());

// };



// function defaultMarkers(locations){
// 		var i = 0;
// 		var markers=[];
// 		Object.keys(model).forEach(function(key) {
// 			var length = model[key].length;
// 			for(i=0; i<length; i++){
// 				//console.log(model[key][i].loc);
// 				var marker = new google.maps.Marker({
// 				    position: model[key][i].loc,
// 				    //animation: google.maps.Animation.DROP,
// 				    map: map,
// 				    title: model[key][i].name
// 				});

// 				marker.addListener('click', toggleBounce);
// 				markers.push(marker);
// 				}

// 				marker.setMap(map);

// 				//console.log(marker);
// 				function toggleBounce() {
// 				  if (this.getAnimation() !== undefined) {
// 				  	  this.setAnimation(undefined);
// 				  } else {
// 				  		 this.setAnimation(google.maps.Animation.BOUNCE);
// 				  }
// 				}


// 		});
// 	return markers;
// };

// function displayLocations(){
//  	var i = 0;
//  	var locations = [];
// 		Object.keys(model).forEach(function(key) {
// 			var length = model[key].length;
// 			for(i=0; i<length; i++){
// 				eachLocation = model[key][i].name;
// 				locations.push(eachLocation);
// 			}
// 	});
// 	return locations;
// };

// function markerAnimation(markers, locations){
// 	console.log(markers);
// 	var length = locations.length;
// 	var name = this;
// 	google.maps.event.addDomListener(this, 'click', function() {


// 	});


// };


// function viewModel(){
// 	var self = this;
// 	self.displayMarkers = defaultMarkers();
// 	self.locations = ko.observableArray(displayLocations());
// 	self.markerAnimation = markerAnimation(self.displayMarkers, self.locations);


// };


