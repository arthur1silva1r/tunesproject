import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import MusicCard from './MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      exbFav: [],
    };
  }

  componentDidMount() {
    this.getFav();
  }

  getFav = async () => {
    this.setState({
      loading: true,
    });

    const dataFav = await getFavoriteSongs();

    this.setState({
      exbFav: dataFav,
      loading: false,
    });
  }

  // removeFav = () => {

  // }

  render() {
    const { loading, exbFav } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          Favorites
          {
            loading ? (<h1>Carregando...</h1>)
              : (
                exbFav.map((musica, index) => (
                  <MusicCard
                    { ...musica }
                    key={ index }
                  />
                ))
              )
          }
        </div>
      </>
    );
  }
}

export default Favorites;
