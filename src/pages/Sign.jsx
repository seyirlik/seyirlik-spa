import React from 'react';
import Layout from '../hoc/Layout';
import Sign from '../components/Sign';

function Login() {
  return (
    <main className="flex-wrapper">
      <Sign />
    </main>
  );
}

export default Layout(Login);
