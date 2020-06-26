import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider, IfFirebaseAuthedAnd, IfFirebaseUnAuthed } from '@react-firebase/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Spinner } from './components/Spinner';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import { firebaseConfig } from './firebaseConfig';
import { actions } from './slices';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));

const App = () => {
  const dispatch = useDispatch();
  const { clearCart } = actions;

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  const handleLogin = () => {
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  const handleLogout = () => {
    dispatch(clearCart());
    firebase.auth().signOut();
  };

  console.log('app');
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <CssBaseline />
      <Suspense fallback={<Spinner />}>
        <IfFirebaseAuthedAnd
          filter={({ user }) => user.email.includes('@aviasales.ru')}
        >
          <AuthenticatedApp handleLogin={handleLogin} handleLogout={handleLogout} />
        </IfFirebaseAuthedAnd>

        <IfFirebaseAuthedAnd
          filter={({ user }) => !user.email.includes('@aviasales.ru')}
        >
          <UnauthenticatedApp handleLogin={handleLogin} />
        </IfFirebaseAuthedAnd>
        <IfFirebaseUnAuthed>
          <UnauthenticatedApp handleLogin={handleLogin} />
        </IfFirebaseUnAuthed>
      </Suspense>
    </FirebaseAuthProvider>
  );
};

export default App;
