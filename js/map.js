
var map;
var model = {

	restaurants: [
		{
		 name: "Paci Restaurant",
		 loc: {lat: 41.121115, lng: -73.285464},
		 address: ["Governor John Davis Lodge Turnpike", "Southport", "CT"]
		},
		{
		 name: "Chips Restaurant",
		 loc: {lat: 41.181515, lng: -73.240850},
		 address: ["525 Tunxis Hill Cut Off", "Fairfield", "CT"]
		}],

	hotels: [
		{
		 name: "Holiday Inn",
		 loc: {lat: 41.182853, lng: -73.188513},
		 address: ["1070 Main St", "Bridgeport", "CT"]
		},
		{
		 name: "Rodeway Inn",
		 loc: {lat: 41.182853, lng: -73.188513},
		 address: ["10 Washington Pkwy", "Stratford", "CT"]
		}],

	bars_and_pubs: [
		{
		 name: "Little Barn",
		 loc: {lat: 41.152615, lng: -73.127059},
		 address: ["1050 Post Rd E", "Westport", "CT"]
		},
		{
		 name: "Old Post Tavern",
		 loc: {lat: 41.148220, lng: -73.255118},
		 address: ["1418 Post Rd", "Fairfield", "CT"]
		}]
};

function displayMap(){
	  map = new google.maps.Map(document.getElementById('map'), {
	    center: model.restaurants[0].loc,
	    zoom: 11
	  });

	  function defaultMarkers(){
		var i = 0;
		Object.keys(model).forEach(function(key) {
		var length = model[key].length;
		for(i=0; i<length; i++){
			console.log(model[key][i].loc);
			var marker = new google.maps.Marker({
		    position: model[key][i].loc,
		    map: map,
		    title: 'Hello World!'
			});
			marker.setMap(map);
		}
	});
};
		defaultMarkers();
}


function viewModel(){
	displayMap();

	var self = this;

	// self.displayLocations = function(){


	// }
}



ko.applyBindings(new viewModel());


