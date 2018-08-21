import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Wrapper } from "./styles.js";

import HelloComponent from "../../components/HelloComponent";
import { fetchSampleData } from "../../actions/hello.js";

export class HelloContainer extends Component {
  state = {
    yy: ""
  };

  componentWillMount() {
    this.props.fetchSampleData();
  }

  render() {
    return (
      <Wrapper>
        <h1>Hello containter!</h1>
        <p>Container components connect to the redux store for props</p>
        <p>
          this is from the redux store --->{" "}
          <span className="from-store">{this.props.hello}</span>
        </p>
        <p>
          this is from the redux store via REST --->{" "}
          <span className="from-store">it {this.props.sampleData.yes}</span>
        </p>
        <HelloComponent message={this.props.sampleData.yes} />
      </Wrapper>
    );
  }
}

HelloContainer.propTypes = {
  hello: PropTypes.string,
  sampleData: PropTypes.object,
  fetchSampleData: PropTypes.func
};
const mapStateToProps = state => ({
  hello: state.hello.message,
  sampleData: state.hello.sampleData
});
const mapDispatchToProps = dispatch => ({
  fetchSampleData: () => dispatch(fetchSampleData())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloContainer);
