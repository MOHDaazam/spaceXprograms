import React, { Component } from "react";
import Card from "./components/Card.js";
import Filters from "./components/Filters.js";
import axios from "axios";
let API = "https://api.spaceXdata.com/v3/launches?limit=100";

// Home component of Space X app
export default class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceXdata: [],
      filters: {},
      isLoading: false,
      activeFilters: {},
    };
  }
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
          isLoading: false,
        });
      });
    });
  };

  render() {
    if (this.state.isLoading) {
      return <h2 style={{ textAlign: "center" }}>Please wait...</h2>;
    } else {
      return (
        <div className="App">
          <header className="header my-header ">
            <h1 className="App-title">Space X Launch Programs</h1>
          </header>

          <section className="main-page">
            <div className="col-md-3">
              <Filters
                filters={this.state.filters}
                activeFilters={this.state.activeFilters}
                handleFilters={this.handleFilters}
              />
            </div>

            <div className="col-md-9 result-section">
              {this.state.spaceXdata.length === 0 ? (
                <h2 style={{ right: "40%",position: "absolute" }} className='xs-layout'>
                  No result found !
                </h2>
              ) : (
                this.state.spaceXdata.map((flight, i) => (
                  <div
                    key={i}
                    className=""
                  >
                    <Card flight={flight} />
                  </div>
                ))
              )}
            </div>
          </section>
          <footer className="footer">
            <h4 className="title-h5">
              Developed by: <span className="text-span">Mohd Azam</span>
            </h4>
          </footer>
        </div>
      );
    }
  }
}
