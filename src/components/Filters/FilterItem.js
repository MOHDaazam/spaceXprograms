import React, { Component } from "react";

//Renders Filter item
export default class FilterItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <button
        key={this.props.key}
        style={{
          backgroundColor:
            this.props.activeFilters[this.props.filterKey] === String(this.props.value)
              ? "green"
              : "#5cb85c",
        }}
        onClick={() =>
          this.props.onClick(this.props.value, this.props.filterKey)
        }
        className="btn btn-success filter launch-succes-text"
      >
        {String(this.props.value)}
      </button>
    )
  }
}
