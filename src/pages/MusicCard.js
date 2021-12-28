import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoritas: new Set(),
    };
  }

  componentDidMount() {
    this.trazFavoritas();
  }

  favoritarMusica = async (id) => {
    const { favoritas } = this.state;
    this.setState({
      loading: true,
    });
    if (!favoritas.has(id)) {
      await addSong(id);
    }
    this.setState({
      loading: false,
    });
  }

  trazFavoritas = async () => {
    this.setState({
      loading: true,
    });
    const data = await getFavoriteSongs();
    const dataIds = new Set(data.map((song) => song.trackId));
    console.log(dataIds);
    this.setState({
      favoritas: dataIds,
      loading: false,
    });
  }

  render() {
    const { loading, favoritas } = this.state;
    const { previewUrl, trackName, trackId } = this.props;

    return (
      loading ? (<h1>Carregando...</h1>)
        : (
          <div>
            <h3>{ trackName }</h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>
                audio
              </code>
              .
            </audio>
            <label htmlFor="favorite">
              Favorita
              <input
                type="checkbox"
                name="favorite"
                id="favorite"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ () => this.favoritarMusica(trackId) }
                value={ trackId }
                checked={ favoritas.has(trackId) }
              />
            </label>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
};

MusicCard.defaultProps = {
  trackName: '',
  previewUrl: '',
  trackId: 0,
};

export default MusicCard;
