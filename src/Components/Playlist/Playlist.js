import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    // Getting an error about undefined from e.target.value when handleNameChange is inovked in the render method.
    const newPlayListName = e.target.value;
    this.props.onNameChange(newPlayListName);
  }

  render () {
    return (
      <div className="Playlist">
        {/* Step 59 related??? Swap between the two following lines to get error or not mentioned above... */}
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
        {/* <input defaultValue={'New Playlist'} onChange={this.handleNameChange()}/> */}
        <TrackList
          tracks={this.props.playListTracks}
          onRemove={this.props.onRemove}
          isRemoval={true} />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
