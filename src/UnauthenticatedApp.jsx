import React from 'react';
import { Welcome } from './components/Welcome';

export const UnauthenticatedApp = ({ handleLogin }) => (
  <Welcome handleLogin={handleLogin} />
);
