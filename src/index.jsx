import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { FirebaseAppProvider } from 'reactfire';
import App from './App';
import { Spinner } from './components/Spinner';
import store from './app/store';
import { firebaseConfig } from './firebase';

ReactDOM.render(
  <Provider store={store}>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    </FirebaseAppProvider>
  </Provider>,
  document.getElementById('root'),
);
