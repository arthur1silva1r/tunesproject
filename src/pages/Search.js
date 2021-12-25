import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const minimalArtistNameLength = 1;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      arthistName: '',
      disabledBtn: true,
      loading: false,
      artistExb: [], // artista que será exibido na tela
      req: false,
    };
  }

  artistNameChange = ({ target: { value } }) => {
    if (value.length >= minimalArtistNameLength) {
      this.setState({
        arthistName: value,
        disabledBtn: false,
      });
    } else {
      this.setState({
        arthistName: value,
      });
    }
  }

  searchBtnAction = async () => {
    this.setState({
      loading: true,
    });
    const { arthistName } = this.state;
    const dataArtist = await searchAlbumsAPI(arthistName);
    this.setState({
      loading: false,
      artistExb: dataArtist,
      req: true,
    });
  }

  render() {
    const { arthistName, disabledBtn, loading, req, artistExb } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">Search</div>
        {
          loading ? (<p>Carregando...</p>) : (
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
                onClick={ this.searchBtnAction }
              >
                Pesquisar
              </button>
            </form>
          )
        }
        {
          req && (
            <>
              <h4>
                Resultado de álbuns de:
                {' '}
                {arthistName}
              </h4>
              <div>
                {artistExb.length === 0 ? <h1>Nenhum álbum foi encontrado</h1> : (
                  artistExb.map((album, index) => (
                    <div key={ index }>
                      <img src={ album.artworkUrl100 } alt="imagem do album" />
                      <h4>{album.collectionName}</h4>
                      <Link
                        to={ `album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        {album.artistName}
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </>
          )
        }
      </>
    );
  }
}

export default Search;
