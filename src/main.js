/**
 * Created by ck on 15/07/2017.
 */
let nmemory = {};
nmemory.markers = [];
nmemory.locations = locations;
nmemory.init = () => {
    nmemory.infoWindow = new google.maps.InfoWindow();
    let center = {lat: 31.099361, lng: 121.179013};
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    nmemory.map = map;
    // Add some markers to the map.
    let markerImage = new google.maps.MarkerImage('images/chart.png',
        new google.maps.Size(24, 32));

    nmemory.locations.forEach((location) => {
        let marker = new google.maps.Marker({
            position: {lat: location.lat, lng: location.lng},
            // label: labels[i % labels.length]
            icon: markerImage
        });
        nmemory.markers.push(marker);
        let fn = nmemory.markerClick(location);
        google.maps.event.addListener(marker, 'click', fn);
    });

    // Add a marker clusterer to manage the markers.
    let markerCluster = new MarkerClusterer(map, nmemory.markers, {
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
nmemory.markerClick = (location) => {
    return (e) => {
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
        let infoHtml = `<div class="markerInfo">
            <a href="photoWall.html" target="_blank"><img src="${location.image}" /></a>
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
