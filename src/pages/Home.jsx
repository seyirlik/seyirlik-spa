import React from 'react';
import Layout from '../hoc/Layout';
import { useSelector } from 'react-redux';
//components
import Slider from '../components/Slider';
import Sign from '../components/Sign';

const Home = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <main className="flex-wrapper">
      <Slider />
      {!isAuthenticated && <Sign />}
    </main>
  );
};

export default Layout(Home);
