import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layouts/Layout';

function Profile(props) {
  const { nick } = useParams();
  return (
    <div>
      <h1>Profile - {nick}</h1>
    </div>
  );
}

export default Layout(Profile);
