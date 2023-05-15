function initMap() {
  var latLng = { lat: 33.493590, lng: 73.133297 };
  var lastMarker = null;
  var holdTimer;
  var holdDelay = 300;
  var mapDiv = document.getElementById('map');
  var toggleBtn = document.getElementById('flexSwitchCheckDefault');
  var image = "https://raw.githubusercontent.com/JunaidAbbas07/Googlemap/main/Project.png";


  var map = new google.maps.Map(mapDiv, {
    zoom: 14,
    center: latLng,
    clickableIcons: false

  });
  var imageBounds = {
    north: latLng.lat + 0.016,
    south: latLng.lat - 0.016,
    east: latLng.lng + 0.019,
    west: latLng.lng - 0.02
  };

  var overlay = new google.maps.GroundOverlay(
    image,
    imageBounds
  );

  google.maps.event.addListener(map, 'click', function (event) {

    if (lastMarker) {
      lastMarker.setMap(null);
    }

    var marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      title: 'Marker at ' + event.latLng.lat() + ', ' + event.latLng.lng(),

    });

    lastMarker = marker;

    overlay.setMap(map);
  });

  overlay.setMap(map);

  google.maps.event.addListener(overlay, 'mousedown', function () {

    overlay.setMap(null);
    
  });

  google.maps.event.addListener(overlay, 'mouseup', function () {

    marker.setMap(map)
    overlay.setMap(map);

  });

  google.maps.event.addListener(overlay, 'touchstart', function () {

    overlay.setMap(null);

  });

  google.maps.event.addListener(overlay, 'touchend', function () {

    marker.setMap(map)
    overlay.setMap(map);

  });

  google.maps.event.addListener(overlay, 'mousedown', function (event) {
    holdTimer = setTimeout(function () {
      overlay.setMap(map)
    }, holdDelay);
  });


  google.maps.event.addListener(overlay, 'touchmove', function (event) {
    holdTimer = setTimeout(function () {
      overlay.setMap(map)
    }, holdDelay);
  });
  




  toggleBtn.addEventListener('click', toggleOverlay);

  function toggleOverlay() {
    if (overlay.getMap()) {

      overlay.setMap(null);

    } else {

      overlay.setMap(map);

    }
  }

}

