import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuth, useUser } from 'reactfire';
import CssBaseline from '@material-ui/core/CssBaseline';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import { actions } from './slices';
import { googleAuthProvider } from './firebase';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));

const App = () => {
  const auth = useAuth();
  const currentUser = useUser();
  const dispatch = useDispatch();
  const { clearCart } = actions;

  const handleLogin = () => {
    auth().signInWithPopup(googleAuthProvider);
  };

  const handleLogout = () => {
    dispatch(clearCart());
    auth().signOut();
  };

  console.log('app');

  return (
    <>
      <CssBaseline />
      {currentUser && currentUser.email.includes('@aviasales.ru')
        ? <AuthenticatedApp handleLogin={handleLogin} handleLogout={handleLogout} />
        : <UnauthenticatedApp handleLogin={handleLogin} />}
    </>
  );
};

export default App;
