$(function() {

  var currentState;

  var map = L.map('map', {
    center: [52, -120],
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
    var geojson = L.geoJson(data, {
      style: {
        color: '#555',
        weight: 1,
        fillColor: '#858585'
      },
      onEachFeature: function(feature, layer) {
        var defaultStyle = layer.style;
        layer.on('click', function(e) {
          geojson.eachLayer(function(l) {
            geojson.resetStyle(l);
          });
          highlightFeature(layer);
          selectFeature(feature);
        });
      }
    }).addTo(map);
  });

  function selectFeature(feature) {
    currentState = feature.properties.NAME;
    $('#state').text(currentState);
    $('#show').show();
  }

  function highlightFeature(layer) {
     layer.setStyle({
         weight: 2,
         color: '#000',
         fillColor: '#33C3F0',
     });
     if (!L.Browser.ie && !L.Browser.opera) {
         layer.bringToFront();
     }
  }

  function transition() {
    $('#selector').toggle();
    $('#displayer').toggle();
  }

  $('#show').on('click', function() {
    transition();
    imagePath();
  });

  $('#back').on('click', function() {
    transition();
  });

  function imagePath() {
    var sname = currentState.replace(' ', '_');
    var path = '../data/'.concat(
      sname,
      '/',
      'P_RCP_85_',
      $('#period').val(),
      '__',
      sname,
      '__P',
      $('#year').val(),
      '.png'
    );

    $('#selected').text(currentState.concat(
      ' ',
      $("#year option:selected").text(),
      ' ',
      $("#period option:selected").text()
    ));

    $('#image').attr('src', path);
  }

});
