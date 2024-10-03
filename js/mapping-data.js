
    $('.main-map-container .ma-backdrop').on('click',function(){
        $('.main-map-container aside').addClass('left-100');
        $(this).addClass('d-none');
    });
    const KEY="AIzaSyDvQMZoz8iO5th02I1xZoiZdqd_8HaM-zQ";
    var longOrigin;
    var latOrigin;
    var longDestination;
    var latDestination;

    function initMap(){

        //closing marker details

        $('.close-aside').on('click', function(){
            $(this).parent().parent().addClass('left-100');
            $('.ma-backdrop').addClass('d-none');
            // marker.setAnimation(null);
            removeMarkers();
        });

        

         //incident icon
         var warning = {
            url: "images/map-assets/warning.svg", // url
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


         //service point
         var servicePoint= {
            url: "images/map-assets/flag.svg", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        //active agent icon
        var activeAgent = {
            url: "images/map-assets/active-agent.svg", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        //inactive agent icon
        var inactiveAgent = {
            url: "images/map-assets/inactive-agent.svg", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };



         //off street parking
         var street_parking = {
            url: "images/map-assets/pin.svg", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

         //bus park
         var bus = {
            url: "images/map-assets/bus.svg", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        //street  icon
        var offStreet = {
            url: "images/map-assets/street-parking.svg", // url
            scaledSize: new google.maps.Size(55, 55), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        //city hall marker size styling
        var hall_icon = {
            url: "images/map-assets/parliament.svg", // url
            scaledSize: new google.maps.Size(45, 45), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        //compliant cars icon
        var compliantCar={
            url: "images/map-assets/compliant-a.svg", // url
            scaledSize: new google.maps.Size(45, 45), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        }

         //to be clamped  cars icon
         var toClamp={
            url: "images/map-assets/tobe-clamped-a.svg", // url
            scaledSize: new google.maps.Size(45, 45), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        }

        //to be unclamped
        var toUnClamp={
            url: "images/map-assets/to-unclamp.svg", // url
            scaledSize: new google.maps.Size(45, 45), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        }

        //clamped cars
        var clamped={
            url: "images/map-assets/clamped-a.svg", // url
            scaledSize: new google.maps.Size(45, 45), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        }


        //the map options
        var options={
            zoom:15,
            center:{lat:-1.2921,lng:36.8219}
        }
       

        //new map
        var map=new google.maps.Map(document.getElementById('map'), options);
        

        /*

        //add marker
        var marker=new google.maps.Marker({
            position:{lat:-1.2925606, lng:36.7809636},
            map: map,
            icon: hall_icon
        });

        var infowindow=new google.maps.InfoWindow({
            content:'<h1>City Hall</h1>'
        });

        marker.addListener('click', function(){
            infowindow.open(map,marker);
        });
        */

       var gmarkers = [];

        //listen for click on  map

        // the smooth zoom function not in use
            function smoothZoom (map, max, cnt) {
            if (cnt >= max) {
                return;
            }
            else {
                z = google.maps.event.addListener(map, 'zoom_changed', function(event){
                    google.maps.event.removeListener(z);
                    smoothZoom(map, max, cnt + 1);
                });
                setTimeout(function(){map.setZoom(cnt)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
            }
        }

        google.maps.event.addListener(map, 'dblclick',function(event){
            
            //add marker
            addMarker({coords:event.latLng});

           

            //get value of clicked coodinates

            //stores coodinates of selected area
            var newCoords=event.latLng;

            // return clicked area coods
            console.log( event.latLng);
           
            console.log(newCoords.toString());
            newCoords=newCoords.toString();
            var Latitude;
            var longitude;
            longitude=newCoords.substring(newCoords.lastIndexOf(",") + 1);
            Latitude=newCoords.substring(0,newCoords.indexOf(','));
            Latitude=Latitude.substring(Latitude.lastIndexOf("(") + 1);

            longitude=longitude.substring(0,longitude.indexOf(')'));
            // console.log("Lat:"+Latitude);
            // console.log("long:"+longitude);

            //reverse geocoding function
            //usses clicked coodinates to get the newly clicked llocation

           
            smoothZoom(map,12,map.getZoom());


            map.setCenter(new google.maps.LatLng( Latitude, longitude));

            reverseGeocoding(Latitude,longitude);
           
            // alert(event.latLng);

            //get latitude
            // var theStreet=newCoords.results[0];
            // alert(theStreet);
            
            
            
          

            //opens the side bar form
            $('#newPoint').removeClass('left-100').siblings().addClass('left-100');
           
            // alert("ready");
            // $(".content, .header").append('<div class="ma-backdrop" data-ma-action="aside-close" data-ma-target=' + e + " />");
            // alert("ready");
        });

        


         //street coodinates
         addMarker({
            coords:{lat:-1.284319, lng:36.8238173},
            iconImage:street_parking,
            content:'<p class="d-none">street|unique identifer</p><h6>Tom Mboya Street</h6> <P><strong>20 parking slots available</strong> Out of <strong>27 parking slots</strong></p>'
        });

        //compliant car
        addMarker({
            coords:{lat:-1.29889, lng:36.8186003},
            iconImage:compliantCar,
            content:'<p class="d-none">car|plate num</p><h6 class="text-uppercase d-flex align-items-center"><span class="active-agent mr-2"></span>KAT 211Z<span></h6>'
        });

        //inactive agent
        addMarker({
            coords:{lat:-1.29889, lng:36.8386003},
            iconImage:inactiveAgent,
            content:'<p class="d-none">agent|plate num</p><h6 class="text-capitalize d-flex align-items-center"><span class="offline-agent mr-2"></span> <span>Alex Wanjala <small><strong>(INACTIVE)</strong></small></span></h6> <p class="pb-0 mb-0">Last seen at <strong>Tom Mboya Street</strong> at 2:06 PM </strong></p><p>Most recent activity: <strong>Queried Car plate Number KBW 2589T at 11:41PM</strong><div class="listview text-align-left text-capitalize pl-0">  <div class="listview__header text-align-left text-capitalize text-left"><strong>23MB data (70%)</strong> Consumed in the <strong>last 13 Days</strong></div> <div class="progress"> <div class="progress-bar progress-bar-warning" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div> </div></div></p> '
        });

        //inactive agent
        addMarker({
            coords:{lat:-1.29789, lng:36.8486003},
            iconImage:inactiveAgent,
            content:'<p class="d-none">agent|agent num</p><h6 class="text-capitalize d-flex align-items-center"><span class="offline-agent mr-2"></span> <span>Alex Wanjala <small><strong>(INACTIVE)</strong></small></span></h6> <p class="pb-0 mb-0">Last seen at <strong>Tom Mboya Street</strong> at 2:06 PM </strong></p><p>Most recent activity: <strong>Queried Car plate Number KBW 2589T at 11:41PM</strong></p> <div class="listview text-align-left text-capitalize pl-0">  <div class="listview__header text-align-left text-capitalize text-left"><strong>2MB data (25%)</strong> Consumed in the <strong>last 21 Days</strong></div> <div class="progress"> <div class="progress-bar progress-bar-success" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div> </div></div>'
        });

         //active agent
         addMarker({
            coords:{lat:-1.3289, lng:36.8452003},
            iconImage:activeAgent,
            content:'<p class="d-none">agent|plate num</p><h6 class="text-capitalize d-flex align-items-center"><span class="offline-agent mr-2"></span> <span>Alex Wanjala <small><strong>(INACTIVE)</strong></small></span></h6> <p class="pb-0 mb-0">Last seen at <strong>Tom Mboya Street</strong> at 2:06 PM </strong></p><p>Most recent activity: <strong>Queried Car plate Number KBW 2589T at 11:41PM</strong><div class="listview text-align-left text-capitalize pl-0">  <div class="listview__header text-align-left text-capitalize text-left"><strong>23MB data (70%)</strong> Consumed in the <strong>last 13 Days</strong></div> <div class="progress"> <div class="progress-bar progress-bar-warning" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div> </div></div></p> '
        });

        //to clamp car
        addMarker({
            coords:{lat:-1.2974586, lng:36.8087993},
            iconImage:toClamp,
            content:'<p class="d-none">car|plate num</p><h6 class="text-uppercase d-flex align-items-center"><span class=" mr-2 offline-agent"></span><span>KCV 252Y</span></h6>'
        });

        //to unclamp car
        addMarker({
            coords:{lat:-1.29948, lng:36.8151453},
            iconImage:toUnClamp,
            content:`<p class="d-none">car|plate num</p>
            <h6 class="text-uppercase d-flex align-items-center">
                <span class="unclump-car mr-2"></span>
                <span>KBZ 2T2M</span>
            </h6>`
        });

        //incidents

        addMarker({
            coords:{lat:-1.29948, lng:36.8751453},
            iconImage:warning,
            content:`<p class="d-none">incident|identifiret</p>
            <img class="mb-3" src="demo/img/widgets/photo-1564993719576-7b00be6317cd.jpg" alt=""> 
            <h6> Violent Nairobian</h6> 
            <p class="mb-0 pb-0">Reported By Tonny Jumba</p>
            <strong class="text-info">20 Min Ago</strong>`
        });

         //clamped
         addMarker({
            coords:{lat:-1.294219, lng:36.806824},
            iconImage:clamped,
            content:'<p class="d-none">car|plate num</p><h6  class="text-uppercase d-flex align-items-center"><span class="clamped-car mr-2"></span><span>KBY 252P</span></h6>'
        });

        //city hall
        addMarker({
            coords:{lat:-1.2925606, lng:36.7809636},
            iconImage:hall_icon,
            content:'<p class="d-none">collectionPoint|identifier</p><h4>city_hall</h4><P><strong>KES 5,230,600</strong> already collected</p>',
            
        });

        //sunken
        addMarker({
            coords:{lat:-1.2924789,lng:36.8243687},
            iconImage:offStreet,
            content:'<p class="d-none">offstreetParking|identifier</p><h6>Sunken (Offstereet Parking)</h6> <P><strong>KES 5,230,600</strong> already collected</p>'
        });

         //buss park
         addMarker({
            coords:{lat:-1.2867576,lng:36.8344851},
            iconImage:bus,
            content: '<p class="d-none">offstreetParking|identifier</p><h6>Bus Park (Offstreet Parking)</h6> <P><strong>KES 3,256,230</strong> already collected</p>'
        });

        //service point or collection point
        addMarker({
            coords:{lat:-1.27576,lng:36.834851},
            iconImage:servicePoint,
            content: '<p class="d-none">collectionPoint|identifier</p><h6>RevenueSure Agent</h6> <P><strong>KES 5,230,600</strong> already collected</p>'
        });

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
           // alert("content not set");

        }

            if(props.iconImage){
                //set icon image if its there
                marker.setIcon(props.iconImage);
                //alert("icon setting");
               
            }

            if(!props.iconImage){
                //set icon image if its there
                marker.setIcon(props.iconImage);
               // alert("icon not set");
               
            }

            // check if there is content
            if(props.content){
                //set icon image if its there

                var infowindow=new google.maps.InfoWindow({
                    content:props.content
                });

                marker.addListener('mouseover', function(){
                    infowindow.open(map,marker);                        

                });

                marker.addListener('click', function(e){
                    toggleBounce(marker);

                   
                   
                    // alert(iconImage); 
                    // alert( e.latLng);

                    //position of the clicked marker . the longitude and latitude
                    var pointPosition=e.latLng;

                    var theContent=infowindow.content.substr(18);
                    var theContent=theContent.substring(0, theContent.indexOf('<'));

                    //the group of markers eg car,incident,collection points etc
                    var theGroup=theContent.substring(0, theContent.indexOf('|'));

                    //the unique identifier of the clicked item eg number plate
                    var uniqueIdentifier=theContent.substring(theContent.lastIndexOf("|") + 1)

                    // alert(theGroup);

                    //if else statements to bring out the correct side details depending on the groups category
                    

                    if(theGroup=="car"){
                        //functions related to cars goes here
                        $('#car-info').removeClass('left-100').siblings().addClass('left-100');
                        $('.main-map-container .ma-backdrop').removeClass('d-none');
                        $(".content, .header").append('<div class="ma-backdrop" data-ma-action="aside-close" data-ma-target=' + e + " />");

                    }

                    if(theGroup=="incident"){
                        //functions for incidents
                        
                        $('#incident-info').removeClass('left-100').siblings().addClass('left-100');
                        $('.main-map-container .ma-backdrop').removeClass('d-none');
                        $(".content, .header").append('<div class="ma-backdrop" data-ma-action="aside-close" data-ma-target=' + e + " />");

                    }

                    if(theGroup=="collectionPoint"){
                        //functions for collection points
                        $('#collectionPoint-info').removeClass('left-100').siblings().addClass('left-100');
                        $('.main-map-container .ma-backdrop').removeClass('d-none');
                        $(".content, .header").append('<div class="ma-backdrop" data-ma-action="aside-close" data-ma-target=' + e + " />");
                    }

                    if(theGroup=="agent"){
                        //function for agents
                        $('#agents-info').removeClass('left-100').siblings().addClass('left-100');
                        $('.main-map-container .ma-backdrop').removeClass('d-none');
                        $(".content, .header").append('<div class="ma-backdrop" data-ma-action="aside-close" data-ma-target=' + e + " />");
                    }

                    if(theGroup=="offstreetParking"){
                        //function for off street parking
                        $('#offstreet-info').removeClass('left-100').siblings().addClass('left-100');
                        $('.main-map-container .ma-backdrop').removeClass('d-none');
                        $(".content, .header").append('<div class="ma-backdrop" data-ma-action="aside-close" data-ma-target=' + e + " />");
                    }

                    if(theGroup=="street"){
                        //function for on street parking
                        $('#street-info').removeClass('left-100').siblings().addClass('left-100');
                        $('.main-map-container .ma-backdrop').removeClass('d-none');
                        $(".content, .header").append('<div class="ma-backdrop" data-ma-action="aside-close" data-ma-target=' + e + " />");
                        
                    }

                      

                                       

                });

               // close content when mouse exits
                marker.addListener('mouseout', function(){
                    infowindow.close(map,marker);                        

                });
                
            }
        }
       // searchAddress();
        getDestination();
        distanceMatrixRouting();
        getOrigin();


        //geo coding function
        //this function gets addresses and so on bassed on user input

        //call geo code
    //geocode()

    //get location form

    
    var locationForm=document.getElementById('location-form');

    //listen for submit
    locationForm.addEventListener('submit',geocode);

    function geocode(e){
        e.preventDefault();
        var location=document.getElementById('location-input').value;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
                address:location,
                key:'AIzaSyDvQMZoz8iO5th02I1xZoiZdqd_8HaM-zQ'
            }
           
            
        })
        .then(function(response){
            // log full response
            console.log(response);

            //formated address
            var formattedAddress=response.data.results[0].formatted_address;
            console.log(formattedAddress);

            var formattedAddressOutput=`
              <ul class="list-group">
                <li class="list-group-item">${formattedAddress}</li>
              </ul>
            `;

            // Address components
            var addressComponents=response.data.results[0].address_components;
            var addressComponentsOutput='<ul class="list-group">'
            for(var i=0;i < addressComponents.length; i++){
                addressComponentsOutput+=`
                    <li class="list-group-item">
                        <strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}
                    </li>
                `;
            }
            addressComponentsOutput+='</ul>'

            //geometry
            var lat=response.data.results[0].geometry.location.lat;
            var lng=response.data.results[0].geometry.location.lng;

            var geometryOutput=`
              <ul class="list-group">
                <li class="list-group-item"><strong>Latitude:</strong> :${lat}</li>
                <li class="list-group-item"><strong>Longitude:</strong> :${lng}</li>
              </ul>
            `;

            //output to APP
            document.getElementById('formatted-address').innerHTML=formattedAddressOutput;
            document.getElementById('address-components').innerHTML= addressComponentsOutput;
            document.getElementById('geometry').innerHTML= geometryOutput;
        })
        .catch(function(error){
            console.log(response);
        });
    }
    //var map;
    var infowindow;

    //getting the origin location using autocomplete 
    function getOrigin(){
        var input = document.getElementById("pac-input");
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
        

    }

    // getting destination using autocomplete

    function getDestination(){
       
        var input = document.getElementById("destination");
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
                url: "images/map-assets/destination3.svg", // url
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
            })
            markers.push(marker);
            var infowindow=new google.maps.InfoWindow({
                content:marker.description
            });     
    
          
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

            //sending destination lat and lng
            
            latDestination=place.geometry.location.lat();
            longDestination=place.geometry.location.lng();
            distanceMatrixRouting(latOrigin, longOrigin,latDestination,longDestination);

            map.fitBounds(bounds);
            
    
         
        });
        

    }
    
    function searchAddress(){
        var input = document.getElementById("pac-input");
        var searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
         // Bias the SearchBox results towards current map's viewport.
        map.addListener("bounds_changed", function() {
            searchBox.setBounds(map.getBounds());
        });
        //marker
        var markers = []; 
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        //this function runs when the search box is clicked    
        //shows the close button on the search box when someone starts to search for a new place
        $('#pac-input').on('keyup',function(){
            $('.clear-map i').removeClass('d-none');
            $('.map-info-cont').addClass('left-100');
        });

        //this function is fired up when the close button is clicked
        // it clears the searched icons plus the search input box
         $('.clear-map').on('click', function(){
            const places = searchBox.getPlaces();
            console.log(places);
            $('.map-info-cont').addClass('left-100');
            $('#pac-input').val("");
            $('.clear-map i').addClass('d-none');
            // Clear out the old markers.
            markers.forEach((marker) => {
                marker.setMap(null);
            });
        });

        searchBox.addListener("places_changed", () => {
           
        const places = searchBox.getPlaces();

        if (places.length == 0) {
        return;
        } 
        
        // Clear out the old markers.
        markers.forEach((marker) => {
        marker.setMap(null);

        
        
        });
        markers = [];        
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        
        places.forEach(function(place) {
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
        })
        markers.push(marker);
      

        //creating markers for each place
        // markers.push(
        
        //     new google.maps.Marker({
        //     map,
        //     icon,
        //     title: place.name,
        //     position: place.geometry.location,
        //     draggable:true,
            
        //     })
            
        // );

        var infowindow=new google.maps.InfoWindow({
            content:marker.description
        });     

      
        // add a hover event on the search results markers
        // google.maps.event.addListener(marker, "mouseover", function(e) {
        //     infowindow.open(map,marker);  
        //     infowindow.setContent(data.description);
           
        // });

        infowindow.open(map,marker);
        toggleBounce(marker);

        //   adding marker click event

        google.maps.event.addListener(marker, "click", function(e) {
           
             var thePlace =place.name;
            var newCoords=e.latLng;

            newCoords=newCoords.toString();

            var Latitude;
            var longitude;
            longitude=newCoords.substring(newCoords.lastIndexOf(",") + 1);
            Latitude=newCoords.substring(0,newCoords.indexOf(','));
            Latitude=Latitude.substring(Latitude.lastIndexOf("(") + 1);
            longitude=longitude.substring(0,longitude.indexOf(')'));
            //stores the coodinates for the destination address
            latOrigin=Latitude;
            longOrigin=longitude;


            reverseGeocoding(Latitude,longitude);
            $('#newPoint').removeClass('left-100').siblings().addClass('left-100');

            var thePlaceHolder=$('.listview .selected-point-details');

            thePlaceHolder=`
            <p class="mb-0"><strong>The Place Name</strong></p>
            <p class="clicked-place">${thePlace}</p>
            `;
            toggleBounce(marker);
            

            
        });

        //   marker click event ends here

     

        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
        });
        map.fitBounds(bounds);

        // console.log(places[0]);
        // console.log("address components");
        // console.log(places[0].address_components[0]);
        // console.log(places[0].geometry.location.lat);
    });
      
        // serching through the map
    }

    //make the marker bounce
    function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function(){
              marker.setAnimation(null);
          },750);
        }
      }

      //remove marker function
      function removeMarkers(){
        for(i=0; i<gmarkers.length; i++){
            gmarkers[i].setMap(null);
        }
    }

    // reverse geo coding
    function reverseGeocoding(Latitude,longitude){
        const KEY="AIzaSyDvQMZoz8iO5th02I1xZoiZdqd_8HaM-zQ";
    const LAT=-1.270102;
    const LNG=36.8589333;
    let url=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${Latitude},${longitude}&key=${KEY}`;
    fetch(url)
    .then(response=> response.json())
    .then(data=>{
        var reverseResultsOutput= '<ul class="list-group">';
        console.log(data);
        var numOfResults=data.results.length;

        var County;
        var County;
        var subCounty;
        var street;
        var address;
        var ward;
        var province;
        var constituency;
        
        
        for(var num=0;num < numOfResults; num++){
            // let parts=data.results[i].address_components;
            address=data.results[0].formatted_address;
           
            // alert(num);
            let parts=data.results[num].address_components;
            parts.forEach(part=>{
                    if(part.types.includes("administrative_area_level_2")){
                    //we found subcounty inside the data.results[0].address_components[x].types.zmdi-view-arraydo
                    subCounty=part.long_name;
                    
                
                }
                    if(part.types.includes("country")){
                    //we found country inside the data.results[0].address_components[x].types.zmdi-view-arraydo
                    
                    Country=part.long_name;
                
                }

                if(part.types.includes("administrative_area_level_1")){
                    //we found country inside the data.results[0].address_components[x].types.zmdi-view-arraydo
                    County=part.long_name;
                    
                
                }
                if(part.types.includes("administrative_area_level_2")){
                    //we found country inside the data.results[0].address_components[x].types.zmdi-view-arraydo
                   ward=part.long_name;
                    
                
                }

                if(part.types.includes("route")){
                    //we found country inside the data.results[0].address_components[x].types.zmdi-view-arraydo
                   street=part.long_name;
                    
                
                }
                if(part.types.includes("sublocality_level_1")){
                    //we found country inside the data.results[0].address_components[x].types.zmdi-view-arraydo
                   constituency=part.long_name;
                    
                
                }

            });
            
            
           
            }
            // alert("ward::"+ward);
            // alert("street: "+street);
            // alert("constituency: "+constituency);
            // alert("subcounty:"+subCounty);

            $('#newPoint .clicked-ward').text(ward);
            $('#newPoint .clicked-street').text(street);
            $('#newPoint .clicked-subcounty').text(subCounty);
            $('#newPoint .clicked-address').text(address);


       
            let parts=data.results[0].address_components;
            reverseResultsOutput+=`
                <li class="list-group-item"><strong>Address: </strong> :${data.results[0].formatted_address}</li> 
                `;
            parts.forEach(part=>{
            // if(part.types.includes("country")){
            //     //we found country inside the data.results[0].address_components[x].types.zmdi-view-arraydo
            //     reverseResultsOutput+=`
            //     <ul class="list-group">
            //         <li class="list-group-item"><strong>Country:</strong> :${part.long_name}</li>
            //     `;
               
            //     document.getElementById('location-cods').innerHTML=reverseResultsOutput;
            // }

            if(part.types.includes("administrative_area_level_2")){
                //we found country inside the data.results[0].address_components[x].types.zmdi-view-arraydo
                reverseResultsOutput+=`
              
                    <li class="list-group-item"><strong>County: </strong> :${part.long_name}</li>
                `;
               
                document.getElementById('location-cods').innerHTML=reverseResultsOutput;
            }           

            reverseResultsOutput +="</ul>";
        })
    })
    .catch(err => console.warn(err.message));
    }

    //store the icons here
    function start_icon(){
        alert("we are here");

        var icon = {
            url: "images/map-assets/pickup-icon2.svg", // url
            // url: place.icon,//adds unique marker depending on search results
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
        }; 

        var marker;
        marker=new google.maps.Marker({
            map:map,
            //title:place.name,
            //position:place.geometry.location,          
            icon:icon,
            //description:`<div class="pickup-content"><strong>`+place.name+`</strong></div>`
        });
        alert(marker);

        //the icons attributes for search results
       
        return marker;
  
        
    }
    var icons = {
        start: new google.maps.MarkerImage(
        // URL
        "images/map-assets/pickup-icon2.svg",       
        // (width,height)
        new google.maps.Size(44, 32),
        // The origin point (x,y)
        new google.maps.Point(0, 0),
        // The anchor point (x,y)
        new google.maps.Point(22, 32)),
        end: new google.maps.MarkerImage(
        // URL
        'http://maps.google.com/mapfiles/ms/micons/green.png',
        // (width,height)
        new google.maps.Size(44, 32),
        // The origin point (x,y)
        new google.maps.Point(0, 0),
        // The anchor point (x,y)
        new google.maps.Point(22, 32))
    };

    // var icons = {
    //     end: new google.maps.MarkerImage(
    //     // URL
    //     'http://maps.google.com/mapfiles/ms/micons/green.png',
    //     // (width,height)
    //     new google.maps.Size(44, 32),
    //     // The origin point (x,y)
    //     new google.maps.Point(0, 0),
    //     // The anchor point (x,y)
    //     new google.maps.Point(22, 32))
    // }; 

    // distance matrix API 
   
        function distanceMatrixRouting(latOrigin, longOrigin,latDestination,longDestination){

            var origin=new google.maps.LatLng(latOrigin, longOrigin);
            var destination=new google.maps.LatLng(latDestination, longDestination);
            var service=new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],                
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERAL, //miles and feet
                avoidHighways: false,
                avoidTolls: false
            },callback);
            var travel_mode = 'DRIVING';
            var directionsDisplay = new google.maps.DirectionsRenderer({'draggable': false});
            var directionsService = new google.maps.DirectionsService(); 
            displayRoute(travel_mode, origin, destination, directionsService, directionsDisplay)
         }
         

          // get distance results
        function callback(response, status) {
            if (status != google.maps.DistanceMatrixStatus.OK) {
                $('#result').html(err);
            } else {
                var origin = response.originAddresses[0];
                var destination = response.destinationAddresses[0];
                if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                    $('#result').html("Better get on a plane. There are no roads between "  + origin + " and " + destination);
                } else {
                    var distance = response.rows[0].elements[0].distance;
                    var duration = response.rows[0].elements[0].duration;
                    console.log(response.rows[0].elements[0].distance);
                    var distance_in_kilo = distance.value / 1000; // the kilom
                    var distance_in_mile = distance.value / 1609.34; // the mile
                    var duration_text = duration.text;
                    var duration_value = duration.value;
                    $('#in_mile').text(distance_in_mile.toFixed(2));
                    $('#in_kilo').text(distance_in_kilo.toFixed(2));
                    $('#duration_text').text(duration_text);
                    $('#duration_value').text(duration_value);
                    $('#from').text(origin);
                    $('#to').text(destination);
                    // alert(distance_in_kilo.toFixed(2));
                    // alert(duration_value);

                   
                }
            }
        }

        
        var Makemarker=new google.maps.Marker({
            map:map,
            title:place.name,
            position:place.geometry.location,          
            icon:icon,
            description:`<div class="pickup-content"><strong>`+place.name+`</strong></div>`
        });

        //displaying route
        function displayRoute(travel_mode, origin, destination, directionsService, directionsDisplay) {
           
            directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: travel_mode,
                avoidTolls: true
            }, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    new google.maps.DirectionsRenderer({
                        map: map,
                        directions: response,
                        suppressMarkers: true
                    });

                    var leg = response.routes[0].legs[0];
                     
                     var destinationLng=leg.end_location.lng();
                     var destinationLat=leg.end_location.lat();

                     addMarker({
                        coords:{lat:destinationLng, lng:destinationLat},
                        iconImage:Destinationicon,
                        content:'<p class="d-none">street|unique identifer</p><h6>Tom Mboya Street</h6> <P><strong>20 parking slots available</strong> Out of <strong>27 parking slots</strong></p>'
                    });

                    //makeMarker(leg.start_location,Pickupicon, "title", map);
                    //makeMarker(leg.end_location, 'title', map);

                   // directionsDisplay.setDirections(response);

                  //  directionsRenderer.setDirections(response);
                } else {
                    directionsDisplay.setMap(null);
                    directionsDisplay.setDirections(null);
                   // alert('Could not display directions due to: ' + status);
                }
            });
        }

        function makeMarker(position, title, map) {
            new google.maps.Marker({
                position: position,
                map: map,
                icon: Destinationicon,
                title: title
            });
        }

       



    //
    
    }
