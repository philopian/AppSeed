import React, { Component } from "react";
import L from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "NodeModules/leaflet/dist/leaflet.css";

const position = [45.5231, -122.6765];
var MarkerIconStyle = L.icon({
  iconUrl: "../../../assets/images/markers/marker-icon.png",
  shadowUrl: "../../../assets/images/markers/marker-shadow.png",
  iconRetinaUrl: "../../../assets/images/markers/marker-icon@2x.png",
  shadowRetinaUrl: "../../../assets/images/markers/marker-shadow@2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

class MapContainer extends Component {
  constructor(props) {
    super(props);
    console.log("[Map props]", props);
  }

  render() {
    return (
      <div>
        <Map center={position} zoom={13} style={{ height: "400px" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={position} icon={MarkerIconStyle}>
            <Popup style={{ borderRadius: "0px" }}>
              <span>
                Welcome to<br />PORTLAND!
              </span>
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default MapContainer;
