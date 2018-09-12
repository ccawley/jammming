import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      searchResults: [],
      playlistName: '',
      playListTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      let newPlayList = this.state.playListTracks;
      newPlayList.push(track);
      this.setState({ playListTracks: newPlayList });
    }
  }

  removeTrack(track) {
    const trackArr = this.state.playListTracks;
    const newtrackArr = trackArr.filter(savedTrack => track.id !== savedTrack.id);
    this.setState({ playListTracks: newtrackArr });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    Spotify.savePlaylist();
    this.setState({ playlistName: 'New Playlist', playListTracks: [] });
  }

  search(searchTerm) {
    Spotify.search(searchTerm)
    .then(searchResults => {
      this.setState({ searchResults: searchResults});
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playListName={this.state.playlistName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
