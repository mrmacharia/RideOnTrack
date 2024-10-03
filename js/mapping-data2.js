// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBIwzALxUPNbatRBj3Xi1Uhp0fFzwWNBkE&libraries=places">

var  Destinationicon;
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    center:{lat:-1.2921,lng:36.8219},
    zoom: 13,
  });
  new AutocompleteDirectionsHandler(map);

  //destination icon
  Destinationicon = {
  url: "images/map-assets/destination3.svg", // url
  // url: place.icon,//adds unique marker depending on search results
  // size: new google.maps.Size(71, 71),
  // origin: new google.maps.Point(0, 0),
  // anchor: new google.maps.Point(17, 34),
  // scaledSize: new google.maps.Size(25, 25),

  scaledSize: new google.maps.Size(50, 50), // scaled size
  origin: new google.maps.Point(0,0), // origin
  anchor: new google.maps.Point(0, 0) // anchor
}; 

 //destination icon
 var Destinationicon = {
  url: "images/map-assets/destination3.svg", // url
  // url: place.icon,//adds unique marker depending on search results
  // size: new google.maps.Size(71, 71),
  // origin: new google.maps.Point(0, 0),
  // anchor: new google.maps.Point(17, 34),
  // scaledSize: new google.maps.Size(25, 25),

  scaledSize: new google.maps.Size(50, 50), // scaled size
  origin: new google.maps.Point(0,0), // origin
  anchor: new google.maps.Point(0, 0) // anchor
}; 

  var Originicon = {
  url: "images/map-assets/pickup-icon2.svg", // url
  // url: place.icon,//adds unique marker depending on search results
  size: new google.maps.Size(71, 71),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(17, 34),
  scaledSize: new google.maps.Size(25, 25),
}; 

 //getting the origin location using autocomplete 
 function getOrigin(){
  var input = document.getElementById("origin-input");
  var Autocomplete=new google.maps.places.Autocomplete(input);

  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function() {
      Autocomplete.setBounds(map.getBounds());
      
  });
  var markers = []; 
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.

  Autocomplete.addListener("place_changed",() => {
      const place = Autocomplete.getPlace();
      // Clear out the old marker.
      markers.forEach((marker) => {
      marker.setMap(null);
      });

      markers = [];        
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      console.log(bounds);

      if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
      }

      //the icons attributes for search results
      const icon = {
          url: "images/map-assets/pickup-icon2.svg", // url
          // url: place.icon,//adds unique marker depending on search results
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
      }; 

      // Create a marker for each place.
      var marker=new google.maps.Marker({
          map:map,
          title:place.name,
          position:place.geometry.location,          
          icon:icon,
          description:`<div class="pickup-content"><strong>`+place.name+`</strong></div>`
      });
      markers.push(marker);
      var infowindow=new google.maps.InfoWindow({
          content:marker.description
      });   
      latOrigin=place.geometry.location.lat();
      longOrigin=place.geometry.location.lng();
      distanceMatrixRouting(latOrigin, longOrigin,latDestination,longDestination);  

  
      // add a hover event on the search results markers
      // google.maps.event.addListener(marker, "mouseover", function(e) {
      //     infowindow.open(map,marker);  
      //     infowindow.setContent(data.description);
      
      // });

      infowindow.open(map,marker);
      toggleBounce(marker);

      if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
      } else {
          bounds.extend(place.geometry.location);
      } 
      map.fitBounds(bounds);
  });

  getOrigin();
  

}



}




class AutocompleteDirectionsHandler {
  constructor(map) {    
   
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.DRIVING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        // directions: response,
        suppressMarkers: true
    });
;
    this.directionsRenderer.setMap(map);
    const originInput = document.getElementById("origin-input");
    const destinationInput = document.getElementById("destination-input");
    const modeSelector = document.getElementById("mode-selector");
    const originAutocomplete = new google.maps.places.Autocomplete(originInput);
    // Specify just the place data fields that you need.
    originAutocomplete.setFields(["place_id"]);
    const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(["place_id"]);
    this.setupClickListener(
      "changemode-walking",
      google.maps.TravelMode.WALKING
    );
    this.setupClickListener(
      "changemode-transit",
      google.maps.TravelMode.TRANSIT
    );
    this.setupClickListener(
      "changemode-driving",
      google.maps.TravelMode.DRIVING
    );
    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);

    originAutocomplete.addListener("place_changed", function(){
      //getOrigin()
      alert("origin changed");
      this.travelMode = google.maps.TravelMode.DRIVING;
      //this.route();
      const OriginPlace = originAutocomplete.getPlace();
      
      var markers = []; 
      markers.forEach((marker) => {
        marker.setMap(null);
        });

      var bounds = new google.maps.LatLngBounds();
      console.log(bounds);

      if (!OriginPlace.geometry) {
        console.log("Returned place contains no geometry");
        return;
    }
       

    });
  }
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  
  setupClickListener(id, mode) {
   
   

    const radioButton = document.getElementById(id);
    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
    });
  }
 
  


  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }
      
      this.route();
    });
  }
  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    const me = this;
    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
          var leg = response.routes[ 0 ].legs[ 0 ];
          //makeMarker(leg.start_location,Pickupicon, "title", map);
          var leg = response.routes[0].legs[0];
                     
          var destinationLng=leg.end_location.lng();
          var destinationLat=leg.end_location.lat();
          //alert(destinationLng)

          addMarker({
             coords:{lat:destinationLng, lng:destinationLat},
             iconImage:Destinationicon,
             content:'<p class="d-none">street|unique identifer</p><h6>Tom Mboya Street</h6> <P><strong>20 parking slots available</strong> Out of <strong>27 parking slots</strong></p>'
         });
         // makeMarker(leg.end_location, 'title', map);
          
          
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}

 //add marker function
 function addMarker(props){
  //add marker
  var marker=new google.maps.Marker({
  position:props.coords,
  map: map, 
  animation: google.maps.Animation.DROP,
  // icon:props.iconImage             
});
  //alert(props.coords);

  if(!props.content){
    gmarkers.push(marker);
    //alert("content not set");
  }
  if(props.iconImage){
      //set icon image if its there
      marker.setIcon(props.iconImage);
      //alert("icon setting");     
  }

  if(!props.iconImage){
      //set icon image if its there
      marker.setIcon(props.iconImage);
      //alert("icon not set");     
  }

  // check if there is content
  if(props.content){
      //set icon image if its there
      var infowindow=new google.maps.InfoWindow({
          content:props.content
      });
     // alert("content set");
      // marker.addListener('mouseover', function(){
      //     infowindow.open(map,marker);                        

      // });
      infowindow.open(map,marker);       
  }
}

 function makeMarker(position, title, map) {
  new google.maps.Marker({
      position: position,
      map: map,
      icon: Destinationicon,
      title: title
  });
}
