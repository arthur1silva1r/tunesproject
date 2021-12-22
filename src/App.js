import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import NotFound from './pages/NotFound';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Switch>
            <Route path="/" render={ () => <Login /> } exact />
            <Route path="/search" render={ () => <Search /> } exact />
            <Route path="/album/:id" render={ () => <Album /> } exact />
            <Route path="/favorites" render={ () => <Favorites /> } exact />
            <Route path="/profile" render={ () => <Profile /> } exact />
            <Route path="/profile/edit" render={ () => <ProfileEdit /> } exact />
            <Route component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
