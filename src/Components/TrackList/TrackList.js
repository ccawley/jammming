import React, { Component } from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends Component {
  render() {
    // const tracks = this.props.tracks.map(track => <li key={track.id}><Track track={track} /></li>);
    // console.log(tracks);
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => <Track key={track.id} track={track} />)
        }
      </div>
    );
  }
}

export default TrackList;
