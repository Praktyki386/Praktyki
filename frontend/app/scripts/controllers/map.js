'use strict';


angular.module("praktykiApp", ['uiGmapgoogle-maps'])
        .controller("Example", function($scope) {
                $scope.map = {
                    zoom: 14,
                    center: new google.maps.LatLng(51.25,22.54),
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                };
        });
    