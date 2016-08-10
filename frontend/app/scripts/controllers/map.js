'use strict';
var map;
      function initMap() {
        var mapOptions = {
                  zoom: 14,
                  center: new google.maps.LatLng(51.25,22.54),
                  mapTypeId: google.maps.MapTypeId.TERRAIN
              };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);
          
        var marker=new google.maps.Marker({
          position: new google.maps.LatLng(51.25,22.54)
          });

        marker.setMap(map);
      }

