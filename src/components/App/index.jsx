import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WithLogin from '../../hoc/WithLogin';

// Notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from '../../pages/Home';
import AdviceRobot from '../../pages/AdviceRobot';
import Details from '../../pages/Details';
import RandomFilm from '../../pages/RandomFilm';
import Profile from '../../pages/Profile';
import EditProfile from '../../pages/EditProfile';
import LogOut from '../../pages/LogOut';
import NoMatch from '../../pages/NoMatch';

//Modal
import SignModal from '../SignModal';

function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  return (
    <Router>
      {/* {loading && (
        <div className="loading-overlay">
          <span className="loading"></span>
        </div>
      )} */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tavsiye-robotu" component={AdviceRobot} />
        <Route path="/rastgele" component={RandomFilm} />
        <Route path="/f/:slug" component={Details} />
        <Route path="/u/:nick" component={Profile} />
        <Route path="/a/:actor" component={Profile} />
        <WithLogin path="/profil-duzenle" children={<EditProfile />} />
        <WithLogin path="/cikis" children={<LogOut />} />
        <Route path="*" component={NoMatch} />
      </Switch>
      <SignModal />
      <ToastContainer autoClose={8000} />
    </Router>
  );
}

export default App;
