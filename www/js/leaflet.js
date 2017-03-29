require("../sass/leaflet.scss");
var html = require("../html/leaflet.html");


import $ from 'jquery';
import L from 'leaflet';
import http from './services/http';

let map = {};
export class View {
  constructor() {
    // console.log('...view1 constructor');
  }
  deconstructor() {
    console.log('...leaflet deconstructor');
  }

  html() {
    return html;
  }

  init() {
    console.log('...initMap');
    var basemapsource = {
      esriGrey: "http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      esriDarkGrey: "http://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      nokiahybrid: "http://{s}.maptile.maps.svc.ovi.com/maptiler/v2/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8",
      esriSatellite: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      esriOcean: "http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}.jpg",
      esriTopo: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      esriStreet: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      esriSatelliteLables: "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
    };

    var mapSettings = {};
    map = L.map('map', mapSettings).setView([37.4316, -78.6569], 2);
    var basemaps = {
      "Satellite": L.layerGroup([L.tileLayer(basemapsource.esriSatellite), L.tileLayer(basemapsource.esriSatelliteLables), ]).addTo(map),
      "Street": L.tileLayer(basemapsource.esriStreet)
    };

    this.addGeojson(map);
  }

  updateDefaultMarkers() {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }

  addGeojson(map) {
    http.getSampleData()
      .then((geojson) => {
        this.updateDefaultMarkers();
        var layer = L.geoJSON(geojson).addTo(map);
        console.log(layer);

        map.fitBounds(layer.getBounds());
      })
  }



}
export { View as default }