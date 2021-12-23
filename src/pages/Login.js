import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';

const minimalLengthInput = 3;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      btnIsDisable: true,
      loading: false,
      redirect: false,
    };

    this.loginAction = this.loginAction.bind(this);
  }

  handleInputChange = ({ target }) => {
    const { value } = target;
    if (value.length >= minimalLengthInput) {
      this.setState(() => ({
        name: value,
        btnIsDisable: false,
      }));
    }

    this.setState(() => ({
      name: value,
    }));
  }

  async loginAction() {
    const { name } = this.state;
    this.setState({
      loading: true,
    });

    await createUser({ name });

    this.setState({
      redirect: true,
      loading: false,
    });
  }

  render() {
    const { name, btnIsDisable, loading, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      loading ? (
        <div data-testid="page-login">
          <p>Carregando...</p>
        </div>)
        : (
          <div data-testid="page-login">
            <input
              type="text"
              id="nameInput"
              name="userName"
              data-testid="login-name-input"
              placeholder="Nome"
              value={ name }
              onChange={ this.handleInputChange }
            />
            <button
              data-testid="login-submit-button"
              type="button"
              onClick={ this.loginAction }
              disabled={ btnIsDisable }
            >
              Entrar
            </button>
          </div>
        )
    );
  }
}

export default Login;
