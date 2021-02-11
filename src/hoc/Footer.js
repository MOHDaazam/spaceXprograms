import React, { Component } from "react";

//Renders Footer
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className="footer">
        <h4 className="title-h5">
          Developed by: <span className="text-span">Mohd Azam</span>
        </h4>
      </footer>
    );
  }
}
