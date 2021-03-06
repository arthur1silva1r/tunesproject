import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };

    this.trazNome = this.trazNome.bind(this);
  }

  componentDidMount() {
    this.trazNome();
  }

  async trazNome() {
    this.setState({
      loading: true,
    });
    const nuName = await getUser();
    this.setState({ name: nuName.name, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <>
        <header data-testid="header-component">
          {loading ? (<p>Carregando...</p>) : (
            <h1 data-testid="header-user-name">{name}</h1>
          )}
        </header>
        <nav>
          <div>
            <Link to="/search" data-testid="link-to-search">
              Search
            </Link>
          </div>
          <div>
            <Link to="/favorites" data-testid="link-to-favorites">
              Favorites
            </Link>
          </div>
          <div>
            <Link to="/profile" data-testid="link-to-profile">
              Profile
            </Link>
          </div>
        </nav>
      </>
    );
  }
}

export default Header;
