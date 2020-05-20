import React from 'react';
import Layout from '../hoc/Layout';
import { useSelector } from 'react-redux';
//components
import Slider from '../components/Slider';
import Sign from '../components/Sign';

function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <main className="flex-wrapper jc-c">
      <Slider />
      {!isAuthenticated && <Sign />}
    </main>
  );
}

export default Layout(Home);
