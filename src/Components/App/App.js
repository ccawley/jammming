import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

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
      playlistName: 'Curts Playlist',
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
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.setState({ playListTracks: track });
  }

  removeTrack(track) {
    const trackArr = this.state.playListTracks;
    const newtrackArr = trackArr.filter(savedTrack => track.id !== savedTrack.id);
    this.setState({ playListTracks: newtrackArr });
  }

  updatePlaylistName(name) {
    this.setState({ playListName: name });
  }

  savePlaylist() {
    // Guts from step 62 and especially 63 go here? More details might come later in instructions?
  }

  search(searchTerm) {
    console.log(searchTerm);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.onSearch}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playListName={this.state.playListName}
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
