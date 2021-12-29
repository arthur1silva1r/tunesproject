import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.trazUsuario();
  }

  trazUsuario = async () => {
    const user = await getUser();
    this.setState({
      loading: false,
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  }

  render() {
    const { name, loading, email, image, description } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          Profile
          {
            loading ? (<h1>Carregando...</h1>)
              : (
                <div>
                  <img data-testid="profile-image" src={ image } alt={ name } />
                  <Link to="/profile/edit">Editar perfil</Link>
                  <h2>{ name }</h2>
                  <h3>{ email }</h3>
                  <p>{ description }</p>
                </div>
              )
          }
        </div>
      </>
    );
  }
}

export default Profile;
