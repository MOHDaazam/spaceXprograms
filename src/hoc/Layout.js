import React, { Component } from "react";
import Header from './Header'
import Footer from './Footer'

//Renders layout for app
export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className='main-section'>
      <Header/>
      {this.props.children}
      <Footer/>
      </section>
    );
  }
}
