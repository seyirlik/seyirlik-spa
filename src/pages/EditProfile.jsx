import React from 'react';
import withLayout from '../hoc/Layout';
import EditProfileForm from '../components/EditProfileForm';

const EditProfile = () => {
  return (
    <main className="bg-transparent jc-c">
      <EditProfileForm />
    </main>
  );
};

export default withLayout(EditProfile);
