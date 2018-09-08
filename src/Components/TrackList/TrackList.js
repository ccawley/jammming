import React, { Component } from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends Component {
  render() {
    console.log(this.props.tracks);
    const tracks = this.props.tracks.map(track => <li key={track.id}><Track track={track} /></li>);
    return (
      <div className="TrackList">
          <ul>
            {tracks}
          </ul>
      </div>
    );
  }
}

export default TrackList;
