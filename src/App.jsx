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

firebase.initializeApp(firebaseConfig);

const App = () => {
  const dispatch = useDispatch();
  const { clearCart, fetchFoodItems } = actions;
  const url = process.env.REACT_APP_DB_URL;

  useEffect(() => {
    dispatch(fetchFoodItems(url));
  }, []);

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
        <IfFirebaseUnAuthed>
          <UnauthenticatedApp handleLogin={handleLogin} />
        </IfFirebaseUnAuthed>
        <IfFirebaseAuthedAnd
          filter={({ user }) => !user.email.includes('@aviasales.ru')}
        >
          <UnauthenticatedApp handleLogin={handleLogin} />
        </IfFirebaseAuthedAnd>
        <IfFirebaseAuthedAnd
          filter={({ user }) => user.email.includes('@aviasales.ru')}
        >
          <AuthenticatedApp handleLogin={handleLogin} handleLogout={handleLogout} />
        </IfFirebaseAuthedAnd>
      </Suspense>
    </FirebaseAuthProvider>
  );
};

export default App;
