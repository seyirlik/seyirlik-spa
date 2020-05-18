import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './commentForm.css';
import { toast } from 'react-toastify';
import { newComment } from '../../store/actions/details';

function CommentForm() {
  const [content, setContent] = useState('');
  const [isSpoiler, setSpoiler] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  function addNewComment(e) {
    e.preventDefault();

    if (!isAuthenticated || content.trim().length === 0) return false;

    dispatch(newComment(content, isSpoiler)).then((res) => {
      if (res) {
        toast.success('Yorumunuz kaydedildi.');
        setContent('');
        setSpoiler(false);
      }
    });
  }
  return (
    <form className="CommentForm" onSubmit={addNewComment}>
      <textarea
        placeholder={
          isAuthenticated
            ? 'Yorumunuz'
            : 'Yorum yapabilmek için giriş yapmalısınız!'
        }
        className="CommentForm__textarea"
        minLength="10"
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isSpoiler}
            onChange={(e) => setSpoiler(e.target.checked)}
          />
          &nbsp; Spoiler
        </label>
        <button
          disabled={!isAuthenticated || content.trim().length === 0}
          className="CommentForm__button"
        >
          Gönder
        </button>
      </div>
    </form>
  );
}

export default memo(CommentForm);
