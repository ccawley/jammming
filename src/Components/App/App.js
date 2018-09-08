import React, { Component } from 'react';
import './App.css';
// import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
// import Playlist from '../Playlist/Playlist';

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
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* {<!-- Add a SearchBar component -->} */}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            {/* {<!-- Add a Playlist component -->} */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
