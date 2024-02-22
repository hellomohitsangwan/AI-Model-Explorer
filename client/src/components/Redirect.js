import React from 'react';
import { Redirect as RouterRedirect } from 'react-router-dom';

const Redirect = () => {
  return <RouterRedirect to="/home" />;
};

export default Redirect;