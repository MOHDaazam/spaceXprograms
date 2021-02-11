import React, { Component } from "react";
import LaunchList from "./components/LaunchList/LaunchList.js";
import Filters from "./components/Filters/Filters.js";
import axios from "axios";
let API = "https://api.spaceXdata.com/v3/launches?limit=100";

// Home component of Space X app
export default class Home extends Component {
  state = {
    spaceXdata: [],
    filters: {},
    isLoading: false,
    activeFilters: {},
  };
  //Function which is called the first time the component loads
  componentDidMount() {
    this.setState({ isLoading: true });
    const url = new URL(document.URL);
    if (url.search.includes("?")) {
      this.getSpaceXData("page_reloaded", url.search.replace("?", "&"));
      this.setActiveFilters(url.search);
    } else {
      this.getSpaceXData("initial");
    }
  }
  //Executes when component recieves props.
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const query = nextProps.location.search;
      this.getSpaceXData("filter", query.replace("?", "&"));
      this.setActiveFilters(query);
    }
  }
  //Prepares & sets active filters object from query string
  setActiveFilters = (query) => {
    const activeFilters = {};
    query
      .replace("?", "&")
      .split("&")
      .forEach((item) => {
        if (item !== "") {
          activeFilters[item.split("=")[0]] = item.split("=")[1];
        }
      });
    this.setState({ activeFilters });
  };
  //Takes spaceX programs Data from Api
  getSpaceXData = (endpoint, filters = "") => {
    axios.get(API + filters).then((response) => {
      const spaceXdata = response.data;
      if (endpoint === "initial" || endpoint === "page_reloaded") {
        //Creates Filter
        this.createFilters();
      }
      this.setState({
        spaceXdata,
      });
    });
  };
  //Handles when filters are applied
  handleFilters = (filterValue, filterType) => {
    let filterUrl = this.props.location.search;
    if (filterUrl === "") {
      this.props.history.push(`/home?${filterType}=${filterValue}`);
    } else {
      const url = new URL(document.URL);
      url.searchParams.set(filterType, filterValue);
      this.props.history.push("/home" + url.search);
    }
  };
  //Creates filters from api data
  createFilters = () => {
    axios.get(API).then((response) => {
      const spaceXdata = response.data;
      const years = [];
      const successfulLaunches = [];
      const successfulLandings = [];
      spaceXdata.forEach((flight) => {
        years.push(flight.launch_year);
        successfulLaunches.push(flight.launch_success);
        const flighLandingRecords = flight.rocket.first_stage.cores;
        const flightLastLandStatus =
          flighLandingRecords[flighLandingRecords.length - 1].land_success;
        if (flightLastLandStatus !== null) {
          successfulLandings.push(flightLastLandStatus);
        }
        this.setState({
          filters: {
            years: new Set(years),
            successful_launches: new Set(successfulLaunches),
            successful_landings: new Set(successfulLandings),
          },
        });
        setTimeout(() => this.setState({ isLoading: false }), 200);
      });
    });
  };

  renderFilters = () => (
    <Filters
      filters={this.state.filters}
      activeFilters={this.state.activeFilters}
      handleFilters={this.handleFilters}
    />
  );
  notFoundMessage = () => (
    <h2  className="not-found-msg">
      No result found !
    </h2>
  );
  renderLaunchPrograms = () =>
    this.state.spaceXdata.map((flight, i) => <LaunchList flight={flight} />);

  lazyLoading = () => (
    <div className="spinner"></div>
  )

  render() {
    if (this.state.isLoading) {
      return this.lazyLoading();
    } else {
      return (
        <main className="App">
            <div className="filter-section">{this.renderFilters()}</div>
            <div className="result-section">
              {this.state.spaceXdata.length === 0
                ? this.notFoundMessage()
                : this.renderLaunchPrograms()}
            </div>
        </main>
      );
    }
  }
}
