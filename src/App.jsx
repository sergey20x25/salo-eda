import React, { Suspense, useContext } from 'react';
import { useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Spinner } from './components/Spinner';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import { AuthContext } from './context/AuthContext';
import firebaseApp, { googleAuthProvider } from './firebase';
import { actions } from './slices';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));

const App = () => {
  const dispatch = useDispatch();
  const { clearCart } = actions;

  const handleLogin = () => {
    firebaseApp
      .auth()
      .signInWithPopup(googleAuthProvider);
  };

  const handleLogout = () => {
    dispatch(clearCart());
    firebaseApp
      .auth()
      .signOut();
  };

  const currentUser = useContext(AuthContext);

  console.log('app');
  return (
    <>
      <CssBaseline />
      <Suspense fallback={<Spinner />}>
        {currentUser && currentUser.email.includes('@aviasales.ru')
          ? <AuthenticatedApp handleLogin={handleLogin} handleLogout={handleLogout} />
          : <UnauthenticatedApp handleLogin={handleLogin} />}
      </Suspense>
    </>
  );
};

export default App;
