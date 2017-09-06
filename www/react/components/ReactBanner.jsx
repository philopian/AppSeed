import React from 'react';
import styled from 'styled-components';

// Styles
const Container = styled.div`
  border: 2px solid rgb(42, 125, 153);
  margin: 10px;
  padding: 0px 10px;
  background-color: rgb(236, 236, 236);
  display: inline-block;
  font-family: "helvetica",  "san-serif";
`;
const Title = styled.p`
  margin-bottom: 0px;
  color: rgb(42, 125, 153);
  font-size: 1.5em;
  font-size: 12pt;
  line-height: 70px;
  height: 70px;
`;
const ReactImg = styled.img`
  vertical-align: middle;
  height: 60px;
  -webkit-animation:spin 14s linear infinite;
  -moz-animation:spin 14s linear infinite;
  animation:spin 14s linear infinite;

  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;
const Button =  styled.button`
  background-color: rgb(32, 207, 255);
  display: inline-block;
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-family: Arial;
  font-size: 17px;
  padding: 10px 20px;
  margin: 10px;
  text-decoration: none;
  text-shadow: rgb(47, 102, 39) 0px 1px 0px;
  border: 0;
`;

// React Component
export default class ReactBanner extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Its more performate to bind your methods in the constructor
    this.myCustomMethod = this.myCustomMethod.bind(this);
  }
  // Custom method
  myCustomMethod() {
    console.log('. you clicked me');
  }

  render() {
    return (
      <Container>
        <Title>Hello <ReactImg 
          src={require('./images/react.png')}
          alt=""
        />
          React Component!
        </Title>
        <Button className="button" onClick={this.myCustomMethod}>I am a button</Button>
      </Container>);
  }
}

