import React from 'react';
import Layout from '../hoc/Layout';

function NoMatch() {
  return (
    <img
      src="https://www.mediaclick.com.tr/mp-include/uploads/2019/11/http-error-404.png"
      alt="Sayfa Bulunamadı."
      width="100%"
    />
  );
}

export default Layout(NoMatch);
