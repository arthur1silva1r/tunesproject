import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favoritada: false,
      loading: false,
    };
  }

  favoritarMusica = async ({ target }) => {
    this.setState({
      favoritada: true,
      loading: true,
    });

    await addSong(target.value);

    this.setState({
      loading: false,
    });
  }

  render() {
    const { favoritada, loading } = this.state;
    const { previewUrl, trackName, trackId } = this.props;
    //     if (loading) {
    //       return (
    // <span></span>
    //       );
    //     }
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
                onClick={ this.favoritarMusica }
                value={ trackId }
                defaultChecked={ favoritada }
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
