import React, { Component } from "react";

//Renders most updated filters
export default class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const filters = this.props.filters;
    const isFilters = Object.keys(filters).length;
    if (isFilters === 0) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="card-container filters-container">
          <h4 className="title-h5 filters-heading">Filters:</h4>
          {filters.years.size > 0 ? (
            <div>
              <h6 className="filter-section-title">Launch Year</h6>
              <div className="filter-wrapper">
                {[...filters.years].map((year, i) => (
                  <button
                    key={i}
                    style={{
                      backgroundColor:
                        this.props.activeFilters["launch_year"] === year
                          ? "green"
                          : "#5cb85c",
                    }}
                    onClick={() =>
                      this.props.handleFilters(year, "launch_year")
                    }
                    className="btn btn-success filter"
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {filters.successful_launches.size > 0 ? (
            <div>
              <h6 className="filter-section-title">Successful Launch</h6>
              <div className="filter-wrapper">
                {[...filters.successful_launches].map((launch, i) => (
                  <button
                    key={i}
                    style={{
                      backgroundColor:
                        this.props.activeFilters["launch_success"] ===
                        String(launch)
                          ? "green"
                          : "#5cb85c",
                    }}
                    onClick={() =>
                      this.props.handleFilters(String(launch), "launch_success")
                    }
                    className="btn btn-success filter launch-succes-text"
                  >
                    {String(launch)}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {filters.successful_landings.size > 0 ? (
            <div>
              <h6 className="filter-section-title">Successful Landing</h6>
              <div className="filter-wrapper">
                {[...filters.successful_landings].map((land, i) => (
                  <button
                    key={i}
                    style={{
                      backgroundColor:
                        this.props.activeFilters["land_success"] ===
                        String(land)
                          ? "green"
                          : "#5cb85c",
                    }}
                    onClick={() =>
                      this.props.handleFilters(String(land), "land_success")
                    }
                    className="btn btn-success filter launch-succes-text"
                  >
                    {String(land)}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      );
    }
  }
}
