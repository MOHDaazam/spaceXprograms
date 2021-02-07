import React, { Component } from "react";

// Holds spaceX single program information
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const flight = this.props.flight;
    const flighLandingRecords = flight.rocket.first_stage.cores;
    const flightLastLandStatus =
      flighLandingRecords[flighLandingRecords.length - 1].land_success;
    return (
      <div className="card-container flight-container">
        <div className="mission-patch-container">
          <img src={flight.links.mission_patch} alt={flight.mission_name} className="mission-patch-img" />
        </div>
        <h4 className="mission-name">{`${flight.mission_name} #${flight.flight_number}`}</h4>
        {flight.mission_id.length > 0 ? (
          <div>
            <h5 className="title-h5">Mission Ids:</h5>
            <ul>
              {flight.mission_id.map((missionId, i) => (
                <li key={i}>{missionId}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <h5 className="title-h5">
          Launch Year: <span className="text-span">{flight.launch_year}</span>
        </h5>
        <h5 className="title-h5">
          Successful Launch:{" "}
          <span className="text-span launch-succes-text">
            {String(flight.launch_success)}
          </span>
        </h5>
        {flightLastLandStatus !== null ? (
          <h5 className="title-h5">
            Successful Landing:{" "}
            <span className="text-span launch-succes-text">
              {String(flightLastLandStatus)}
            </span>
          </h5>
        ) : null}
      </div>
    );
  }
}
