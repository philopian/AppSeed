import React, { Component } from "react";
import L from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "NodeModules/leaflet/dist/leaflet.css";
import DefaultMarker from "./DefaultMarker.jsx";
import NewMarkerComment from "./NewMarkerComment.jsx";

const position = [45.5231, -122.6765];
const viewport = {
  center: position,
  zoom: 13
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    console.log("[Map props]", props);
    this.state = {
      viewport: viewport,
      newComment: {
        visibility: false,
        center: null
      }
    };
  }

  onViewportChanged = viewport => {
    this.setState({ viewport });
    console.log("[viewport change]", viewport);
  };

  render() {
    return (
      <div>
        <div
          className="btn-add"
          onClick={() => {
            console.log("[addMarker]", this.state.viewport);
            this.setState({
              newComment: {
                visibility: true,
                center: this.state.viewport.center
              }
            });
          }}
        >
          +
        </div>

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

          {this.state.newComment.visibility ? (
            <NewMarkerComment position={this.state.newComment.center} />
          ) : null}
        </Map>
      </div>
    );
  }
}

export default MapContainer;
