import React, { Component } from 'react';
import './Track.css'

class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return '-';
    } else {
      return '+';
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render () {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {/* I am unsure of where the code from steps 47,55 should go? Line below this is the original version of line below that from codeAcademy. */}
        {/* <a className="Track-action"><!-- + or - will go here --></a> */}
        <a className="Track-action" onClick={this.addTrack}>{this.renderAction()}</a>
      </div>
    );
  }
}

export default Track;
