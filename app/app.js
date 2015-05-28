$(function() {

  var currentState;

  var map = L.map('map', {
    center: [50, -120],
    zoom: 3,
    minZoom: 3,
    maxZoom: 6,
    maxBounds: [
      [-10,-200],
      [80,-50]
    ]
  });

  map.attributionControl.setPrefix("");

  $.getJSON("data/states.geojson", function(data) {
    // find
    L.geoJson(data, {
      style: {
        "color": "#555",
        "weight": 1,
        "opacity": 0.65
      },
      onEachFeature: function(feature, layer) {
        layer.on({
          click: function() {
            selectFeature(feature);
          }
        })
      }
    }).addTo(map);
  });

  function selectFeature(feature) {
    $('#periods').show();
    currentState = feature.properties.NAME;
    $('#state').text(currentState);
  }

  // load config, prepare rest of application
  $.getJSON("app/data_config.json", function(data) {
    // find
    console.log(data);

  });


});
