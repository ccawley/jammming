import React, { Component } from 'react';
import './App.css';
// import SearchBar from '../SearchBar/SearchBar';
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
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.setState({ playListTracks: track })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <SearchBar /> */}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playListName={this.state.playListName}
              playListTracks={this.state.playListTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
