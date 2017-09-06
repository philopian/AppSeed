import React from 'react';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


const Response = styled.div`
  margin: 4px;
`;


export default class DialogExample extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      modalResponse: '',
    };
    // Its more performate to bind your methods in the constructor
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(){
    this.setState({open: true});
  }

  handleClose(response){
    this.setState( Object.assign(this.state, { open: false, modalResponse: response }) );
    console.log(this.state);
  }

  showModalResult(){
    let result = ''
    switch (this.state.modalResponse) {
      case 'yes':
        return `User click on   'YES'    for the modal response`;
        break;
      case 'no':
        return `User click on   'NO'   for the modal response`;
        break;
      default:
        break;
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="No"
        primary={true}
        onClick={this.handleClose.bind(this, 'no')}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        keyboardFocused={false}
        onClick={this.handleClose.bind(this, 'yes')}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Click me to view a modal" onClick={this.handleOpen} />
        <Response>
          { this.showModalResult() }
        </Response>

        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Click on one of the option in this dialog.
        </Dialog>
      </div>
    );
  }
}