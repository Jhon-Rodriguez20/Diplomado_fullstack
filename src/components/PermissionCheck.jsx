import React from 'react';
import { useSelector } from 'react-redux';

const PermissionCheck = ({ requiredRoles, children }) => {
  const user = useSelector(state => state.user.user);

  if (user && requiredRoles.includes(user.rol)) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default PermissionCheck;
