import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerRequest, error } from '../../../store/actions/auth';
const Register = React.memo(() => {
  const history = useHistory();
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleRegister = e => {
    e.preventDefault();
    setLoading(true);
    if (password !== passwordAgain) {
      dispatch(error('Şifreler eşleşmiyor'));
      return;
    }
    dispatch(registerRequest(nick, email, password)).then(res => {
      setLoading(false);
      if (res) history.replace('/#giris');
    });
  };
  return (
    <form className="Sign__form" onSubmit={handleRegister}>
      <input
        value={nick}
        onChange={e => setNick(e.target.value)}
        type="text"
        placeholder="kullanıcı adı"
        className="black-bg-input"
        required
        minLength="3"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        placeholder="email"
        className="black-bg-input"
        required
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="parola"
        className="black-bg-input"
        required
        minLength="6"
      />
      <input
        value={passwordAgain}
        onChange={e => setPasswordAgain(e.target.value)}
        type="password"
        placeholder="parola tekrar"
        className="black-bg-input"
        required
        minLength="6"
      />
      {isLoading ? (
        <span className="loading"></span>
      ) : (
        <button type="submit" className="submit-btn">
          Kayıt Ol
        </button>
      )}
    </form>
  );
});

export default Register;
