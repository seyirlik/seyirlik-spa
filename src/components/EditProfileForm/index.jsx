import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import http from '../../utils/http';
import { setToken } from '../../store/actions/auth';
import { USER_IMAGE_URL } from '../../utils/constants';
import './editProfileForm.css';

function EditProfileForm() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [image, setImage] = useState({});
  const [userFromDb, setUser] = useState([]);
  const [privateAccount, setPrivate] = useState(false);
  const userImage = useRef();

  const imgExt = useMemo(
    () => ['image/png', '/image/jpg', 'image/jpeg', 'image/gif'],
    []
  );

  useEffect(() => {
    http
      .get('/user')
      .then((res) => {
        if (res.success) {
          setUser(res.user);
          setPrivate(res.user.private);
        }
      })
      .catch((err) => alert(err));
  }, []);

  const newImageSelected = useCallback(
    (e) => {
      const file = e.target.files[0];
      const { type } = file;

      if (!imgExt.includes(type)) {
        toast.error(
          'Sadece png,jpg,jpeg ve gif türünde resim yükleyebilirsiniz'
        );
        return false;
      }
      setImage(file);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        userImage.current.src = this.result;
      };
    },
    [imgExt]
  );

  const saveInfoHandler = (e) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('private', privateAccount);

    http
      .post('/user/updateInfo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ success, token }) => {
        if (success) {
          setImage({});
          dispatch(setToken(token));
          toast.success('Değişiklikler Kaydedildi');
        }
      })
      .catch((err) => toast.error(err.response.data.message));

    e.preventDefault();
  };

  function InputEleman({ label, title, disabled, ...rest }) {
    return (
      <div className="input-container">
        <label>{label}:</label>
        <input {...rest} disabled={disabled} className="input-flex" />
        {disabled && (
          <span title={title}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.4em"
              height="1.4em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </span>
        )}
      </div>
    );
  }

  InputEleman.defaultProps = {
    title: 'Değiştirme Hakkınız Bulunmamakta',
    type: 'text',
    disabled: true,
  };

  return (
    <form className="form">
      <div className="input-container file-container">
        <img
          src={`${USER_IMAGE_URL}${userFromDb.profile_image}`}
          alt={user.nick}
          ref={userImage}
          className="user-image"
        />
        <input
          type="file"
          onChange={newImageSelected}
          className="image-input"
        />
      </div>
      <InputEleman label="Nick" defaultValue={userFromDb.nick} name="nick" />
      <InputEleman label="Email" defaultValue={userFromDb.email} name="email" />
      <InputEleman
        label="Gizli"
        type="checkbox"
        disabled={false}
        defaultChecked={privateAccount}
        name="private"
        onChange={(e) => setPrivate(e.target.checked)}
      />
      <button className="save-btn" type="submit" onClick={saveInfoHandler}>
        Kaydet
      </button>
    </form>
  );
}

export default EditProfileForm;
