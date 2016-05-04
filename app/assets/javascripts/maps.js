var mapStyle =

[
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#144b53"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#08304b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0c4152"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b434f"
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b3d51"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#146474"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#021019"
            }
        ]
    }
]


var CustomMarkerBuilder,
  handler,
  extend = function (child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key))
        child[key] = parent[key];
      }
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  },
  hasProp = {}.hasOwnProperty;

CustomMarkerBuilder = (function (superClass) {
  extend(CustomMarkerBuilder, superClass);

  function CustomMarkerBuilder() {
    return CustomMarkerBuilder.__super__.constructor.apply(this, arguments);
  }

  // CustomMarkerBuilder.prototype.create_marker = function () {
  //   var options;
  //   options = _.extend(this.marker_options(), this.rich_marker_options());
  //   return this.serviceObject = new RichMarker(options);
  // };
  //
  // CustomMarkerBuilder.prototype.rich_marker_options = function () {
  //   var marker;
  //   marker = document.createElement("div");
  //   marker.setAttribute('class', 'custom_marker_content');
  //   marker.innerHTML = this.args.custom_marker;
  //   return {content: marker};
  // };

  CustomMarkerBuilder.prototype.create_infowindow = function () {
    var boxText;
    if (!_.isString(this.args.custom_infowindow)) {
      return null;
    }
    boxText = document.createElement("div");
    //boxText.setAttribute("class", 'custom_infowindow_content');
    boxText.style.cssText = "border: 1px solid black; margin-top: 0px; background: white; padding: 5px; padding-top: 0px; max-width: 300px;"
    boxText.innerHTML = this.args.custom_infowindow;
    return this.infowindow = new InfoBox(this.infobox(boxText));
  };

  CustomMarkerBuilder.prototype.infobox = function (boxText) {
    return {
      content: boxText,
      pixelOffset: new google.maps.Size(-150, 0),
    };
  };

  return CustomMarkerBuilder;

})(Gmaps.Google.Builders.Marker);



// --- generated by coffee-script 1.9.2
