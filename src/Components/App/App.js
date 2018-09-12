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
      searchResults: [
        {
          name: 'Nine 2 Five',
          artist: 'Ben Dragon',
          album: 'Work',
          id: 1
        },
        {
          name: 'Ever Work',
          artist: 'Dateless',
          album: 'Goop',
          id: 2
        },
        {
          name: 'Bananas',
          artist: 'Gwen Stefan',
          album: 'Something',
          id: 3
        },
        {
          name: 'APOG Set',
          artist: 'Friend Zone',
          album: 'Crystal Grove',
          id: 4
        }
      ],
      playlistName: '',
      playListTracks: [
        {
          name: 'Nine 2 Five',
          artist: 'Ben Dragon',
          album: 'Work',
          id: 1
        },
        {
          name: 'Ever Work',
          artist: 'Dateless',
          album: 'Goop',
          id: 2
        },
        {
          name: 'APOG Set',
          artist: 'Friend Zone',
          album: 'Crystal Grove',
          id: 4
        }
      ]
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
    // ORIGINAL ATTEMPT/THOUGHT PROCESS BELOW, REFACTORED ABOVE BUT STILL NOT WORKING :(
    // let searchResult = Spotify.search(searchTerm);
    // this.setState({ searchResults: searchResult});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
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
