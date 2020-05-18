import React, { useState } from 'react';
import { loginRequest } from '../../../store/actions/auth';
import { useDispatch } from 'react-redux';
const Login = React.memo((props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginRequest(username, password)).then((res) => {
      if (!res) setLoading(false);

      // TODO go history
    });
  };
  return (
    <React.Fragment>
      <form className="Sign__form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="kullanıcı adı"
          required
          className="black-bg-input Login__input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="parola"
          required
          className="black-bg-input Login__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLoading ? (
          <span className="loading"></span>
        ) : (
          <button type="submit" className="submit-btn">
            Giriş Yap
          </button>
        )}
      </form>
      <a href="/" className="Login__forget">
        Şifremi Unuttum
      </a>
    </React.Fragment>
  );
});

export default Login;
