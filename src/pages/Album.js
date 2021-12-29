import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      listaMusicas: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.trazMusicas();
  }

  trazMusicas = async () => {
    // this.setState({ loading: true });
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    if (data !== undefined) {
      this.setState({
        listaMusicas: data,
        loading: false,
      });
    }
  };

  render() {
    const { listaMusicas, loading } = this.state;
    return (
      <div>
        {loading ? (<p>Carregando...</p>)
          : (
            <div data-testid="page-album">
              <Header />
              <div>
                <img src={ listaMusicas[0].artworkUrl100 } alt="album art" />
                <h4 data-testid="artist-name">
                  { listaMusicas[0].artistName }
                </h4>
                <p data-testid="album-name">{ listaMusicas[0].collectionName }</p>
                <p>{ listaMusicas[0].releaseDate }</p>
              </div>
              <div>
                {
                  listaMusicas.filter((musica) => musica.trackName && musica.previewUrl)
                    .map((song, index) => (<MusicCard
                      { ... song }
                      key={ index }
                    />))
                }
              </div>
            </div>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
