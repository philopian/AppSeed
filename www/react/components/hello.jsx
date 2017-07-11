import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    border: 2px solid rgb(42, 125, 153);
    margin: 20px;
    padding: 10px;
    background-color: rgb(236, 236, 236);
`;

export default class Hello extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <Container>
          <p>Hello React!</p>
        </Container>
    );
  }
}
