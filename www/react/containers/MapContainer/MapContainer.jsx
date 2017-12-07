import React, { Component } from "react";
import L from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "NodeModules/leaflet/dist/leaflet.css";
import DefaultMarker from "./DefaultMarker.jsx";

const position = [45.5231, -122.6765];

class MapContainer extends Component {
  constructor(props) {
    super(props);
    console.log("[Map props]", props);
    this.state = {
      viewport: props.viewport
    };
  }

  onViewportChanged = viewport => {
    // The viewport got changed by the user, keep track in state
    this.setState({ viewport });
    console.log("[viewport change]", viewport);
  };

  render() {
    return (
      <div>
        <Map
          center={position}
          zoom={13}
          style={{ height: "400px" }}
          onViewportChanged={this.onViewportChanged}
          viewport={this.state.viewport}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <DefaultMarker position={position} />
          <DefaultMarker position={[45.5231, -122.6965]} />
        </Map>
      </div>
    );
  }
}

export default MapContainer;
