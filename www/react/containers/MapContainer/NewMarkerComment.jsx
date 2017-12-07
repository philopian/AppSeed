import React from "react";
import { Marker, Popup } from "react-leaflet";

const MarkerIconStyle = L.icon({
  iconUrl: "../../../assets/images/markers/marker-icon-new.png",
  shadowUrl: "../../../assets/images/markers/marker-shadow.png",
  iconRetinaUrl: "../../../assets/images/markers/marker-icon-new@2x.png",
  shadowRetinaUrl: "../../../assets/images/markers/marker-shadow@2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const NewMarkerComment = props => (
  <Marker
    position={props.position}
    icon={MarkerIconStyle}
    draggable={true}
    onClick={() => {
      console.log("click!!!");
    }}
  >
    <Popup style={{ borderRadius: "0px" }}>
      <span>
        I'm a new marker<br />drag me around!!
      </span>
    </Popup>
  </Marker>
);

export default NewMarkerComment;
