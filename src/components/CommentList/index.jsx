import React, { memo } from 'react';
import Comment from '../Comment';
import LazyImageObserver from '../../hoc/LazyImageObserver';

function CommentList({ comments, totalCount }) {
  return (
    <LazyImageObserver data={comments}>
      <div
        className="Comments"
        style={{ marginTop: '20px', marginBottom: '20px' }}
      >
        <h4 className="Comments__title" style={{ fontSize: '20px' }}>
          Yorumlar ({totalCount})
        </h4>
        <div style={{ marginTop: '20px' }}>
          {comments.length > 0 &&
            comments.map((comment) => (
              <Comment comment={comment} key={comment._id} />
            ))}
          {comments.length === 0 && <p>Henüz Yorumlanmamış.</p>}
        </div>
      </div>
    </LazyImageObserver>
  );
}

export default memo(CommentList);
