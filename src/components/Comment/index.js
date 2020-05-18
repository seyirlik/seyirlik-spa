import React, { memo, useState } from 'react';
import { USER_IMAGE_URL } from '../../utils/constants';
import './comment.css';

function Comment({ comment }) {
  const [show, setShow] = useState(!comment.spoiler);
  return (
    <section key={comment._id} className="Comment">
      <a href={`/u/${comment.user.nick}`}>
        <img
          className="Comment__user lazy-image"
          data-src={`${USER_IMAGE_URL}${comment.user.profile_image}`}
          alt={comment.user.nick}
        />
      </a>
      <div
        className={`Comment__content ${
          !show ? 'Comment__content--spoiler' : ''
        }`}
      >
        {!show ? (
          <button className="Comment__spoiler" onClick={() => setShow(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            &nbsp;Spoiler
          </button>
        ) : (
          <p className="Comment__text">{comment.content}</p>
        )}
      </div>
    </section>
  );
}
export default memo(Comment);
