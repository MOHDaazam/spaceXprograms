import React, { Component } from "react";
import FilterItem from "./FilterItem";

//Renders Filter category/section
export default class FilterCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  filterItems = () => [...this.props.filterSection.data].map((filter,key) =>
      <FilterItem
          value={filter}
          key={key}
          isActive={filter === this.props.activeItem}
          onClick={(value,key)=>this.props.handler(value,key)}
          filterKey={this.props.filterSection.filter_key}
          activeFilters={this.props.activeFilters}
          />
  )

  render() {
    console.log('from filtre category',this.props)
    return(
      <section>
        <h6 className="filter-section-title">{this.props.filterSection.name}</h6>
        <div className="filter-wrapper">
        {this.filterItems()}
        </div>
      </section>
    )
  }
}
