import React, { Component } from "react";
import FilterCategory from "./FilterCategory";

//Renders most updated filters
export default class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterData: [
        {
          name: "Launch Year",
          data: props.filters.years,
          filter_key: "launch_year",
        },
        {
          name: "Successful Launch",
          data: props.filters.successful_launches,
          filter_key: "launch_success",
        },
        {
          name: "Successful Landing",
          data: props.filters.successful_landings,
          filter_key: "land_success",
        },
      ],
    };
  }

  render() {
    const filters = this.props.filters;
    const isFilters = Object.keys(filters).length;
    const renderFilters = this.state.filterData.map((filterSection) => (
      <FilterCategory
        filterSection={filterSection}
        handler={(value, key) => this.props.handleFilters(value, key)}
        activeFilters= {this.props.activeFilters}
      />
    ));
    if (isFilters === 0) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="card-container filters-container">
          <h4 className="title-h5 filters-heading">Filters:</h4>
          {renderFilters}
        </div>
      );
    }
  }
}
