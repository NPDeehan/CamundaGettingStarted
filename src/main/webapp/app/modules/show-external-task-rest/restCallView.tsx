import React, { Component } from 'react';

class RestCallView extends Component {

  constructor (props){
    super(props);
  }

  render() {
      return (
        <div>
          <p/>
          <div>
            <h4><a target="_blank" style={{color: '#80e1bb'}} href={this.props.link}>{this.props.topic}</a></h4><br></br>
            <div>{this.props.example}</div><br></br>
            <div>{this.props.description}</div><br></br>
            <div>{this.props.exampleResponse}</div>
          </div>
        </div>
      );
  }
}

export default RestCallView;
