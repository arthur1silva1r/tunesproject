import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      redirect: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.trazUsuario();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  habilitaBtn = () => {
    const { name, image, description, email } = this.state;
    const emailRegex = new RegExp(/^(\w*\.*\w*)*@\w*\.\w*$/);
    const mail = emailRegex.test(email);
    const arrayInputs = [name, image, description, email];
    const inputsValidos = arrayInputs.every((verify) => verify.length === 0);
    if (mail && !inputsValidos) {
      return false;
    }
    return true;
  }

  trazUsuario = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({ name, email, description, image, loading: false });
  }

  editaUsuarioLogado = async () => {
    const { name, image, description, email } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, image, description, email });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const {
      name,
      email,
      description,
      image,
      loading,
      redirect,
    } = this.state;

    if (redirect) {
      return (<Redirect to="/profile" />);
    }

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (<p>Carregando...</p>) : (
          <>
            <img data-testid="profile-image" src={ image } alt={ `${name} avatar` } />
            <label htmlFor="img">
              <input
                data-testid="edit-input-image"
                type="text"
                value={ image }
                name="image"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="name">
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              <input
                data-testid="edit-input-email"
                type="email"
                value={ email }
                name="email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              <span>Descrição</span>
              <input
                data-testid="edit-input-description"
                type="text"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ this.habilitaBtn() }
              onClick={ this.editaUsuarioLogado }
            >
              Salvar
            </button>
          </>
        ) }
      </div>
    );
  }
}

export default ProfileEdit;
