/**
 * Created by ck on 15/07/2017.
 */
//import 'whatwg-fetch';

let nmemory = {};
nmemory.init = () => {
    nmemory.locations = LOCATIONS;
    nmemory.infoWindow = new google.maps.InfoWindow();
    let center = {lat: 31.099361, lng: 121.179013};
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    nmemory.map = map;
    // Add some markers to the map.
    nmemory.markerImage = new google.maps.MarkerImage('images/chart.png',
        new google.maps.Size(24, 32));
    nmemory.showMarkers();
};
nmemory.showMarkers = () => {
    nmemory.markers = [];
    nmemory.locations.forEach((location) => {
        let marker = new google.maps.Marker({
            position: {lat: location.lat, lng: location.lng},
            // label: labels[i % labels.length]
            icon: nmemory.markerImage
        });
        nmemory.markers.push(marker);
        let fn = nmemory.markerClick(location);
        google.maps.event.addListener(marker, 'click', fn);
    });

    // Add a marker clusterer to manage the markers.
    let markerCluster = new MarkerClusterer(nmemory.map, nmemory.markers, {
        styles: [{
            url: 'images/pin.png',
            height: 48,
            width: 30,
            anchor: [-18, 0],
            textColor: '#ffffff',
            textSize: 10,
            iconAnchor: [15, 48]
        }]
    });
};
nmemory.clear = () => {
    for (var i = 0, marker; marker = nmemory.markers[i]; i++) {
        marker.setMap(null);
    }
};
nmemory.refreshMarkers = () => {
    nmemory.clear();
    nmemory.showMarkers();
};
nmemory.markerClick = (location) => {
    return (e) => {
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
        let infoHtml = `<div class="markerInfo">
            <a href="photoWall.html?category=${location.category}" target="_blank"><img src="${location.image}" /></a>
                        <div class="footer">
                        <h3>${location.title}</h3>
                        <p>${location.des}</p>
            </div>
        </div>`;
        let latlng = new google.maps.LatLng(location.lat, location.lng);
        nmemory.infoWindow.setContent(infoHtml);
        nmemory.infoWindow.setPosition(latlng);
        nmemory.infoWindow.open(nmemory.map);
    };
};

nmemory.search = async function () {
    console.log('');
    let response = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=上海&key=AIzaSyAWqa9ZAF3w_yV4ydsWMcjAM3QDwistgXY', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let result = await response.json();
    console.log(result);
};
