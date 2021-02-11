import React, { Component } from "react";

// Renders list of launch programs
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
          <img
            src={flight.links.mission_patch_small}
            alt={flight.mission_name}
            className="mission-patch-img"
          />
        </div>
        <h3 className="mission-name">{`${flight.mission_name} #${flight.flight_number}`}</h3>
        <section>
          <h3 className="title-h5">Mission Ids:</h3>
          <ul>
            {flight.mission_id.length > 0 ? (
              flight.mission_id.map((missionId, i) => (
                <li key={i}>{missionId}</li>
              ))
            ) : (
              <li>N/A</li>
            )}
          </ul>
        </section>
        <p className="title-h5">
          Launch Year: <span className="text-span">{flight.launch_year}</span>
        </p>
        <p className="title-h5">
          Successful Launch:{" "}
          <span className="text-span">{String(flight.launch_success)}</span>
        </p>
        <p className="title-h5">
          Successful Landing:{" "}
          <span className="text-span">
            {flightLastLandStatus !== null
              ? String(flightLastLandStatus)
              : "N/A"}
          </span>
        </p>
      </div>
    );
  }
}
