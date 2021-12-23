import React, { Component } from 'react';
import Header from './Header';

const minimalArtistNameLength = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      arthistName: '',
      disabledBtn: true,
    };
  }

  artistNameChange = ({ target: { value } }) => {
    if (value.length >= minimalArtistNameLength) {
      this.setState({
        arthistName: value,
        disabledBtn: false,
      });
    }

    this.setState({
      arthistName: value,
    });
  }

  render() {
    const { arthistName, disabledBtn } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">Search</div>
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Arthista"
            value={ arthistName }
            onChange={ this.artistNameChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ disabledBtn }
          >
            Pesquisar
          </button>
        </form>
      </>
    );
  }
}

export default Search;
