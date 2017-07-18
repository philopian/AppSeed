import React from 'react';
// import store from '../../www/js/services/store';
import styled from 'styled-components';



const Container = styled.div`
    border: 2px solid rgb(42, 125, 153);
    margin-left: 20px;
    padding: 10px;
    background-color: rgb(236, 236, 236);
    display: inline-block;
`;
const Title = styled.h1`
    color: rgb(42, 125, 153);
    font-size: 1.5em;
`;
const ReactImg = styled.img`
  height: 80px;
  -webkit-animation:spin 14s linear infinite;
  -moz-animation:spin 14s linear infinite;
  animation:spin 14s linear infinite;

  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;
export default class Sample extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Its more performate to bind your methods in the constructor
    this.myCustomMethod = this.myCustomMethod.bind(this);
  }

/*
  // React Methods
  componentWillMount() {
    console.log('componentWillMount');
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
  }
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
*/


  // Custom method
  myCustomMethod() {
    console.log('. you clicked me');

    // store.dispatch({
    //   type: 'UPDATE_SOMETHING',
    //   payload: Date(),
    // });
  }

  render() {
    return (
      <Container>
        <Title>Hello <ReactImg src="assets/images/react.png" alt=""/>React Component!</Title>
        <button className="button" onClick={this.myCustomMethod}>I am a button</button>
      </Container>);
  }
}
