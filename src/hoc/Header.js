import React, { Component } from "react";

//Renders header 
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header className="header my-header ">
        <h2 className="App-title">Space X Launch Programs</h2>
      </header>
    );
  }
}
