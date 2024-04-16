import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const usePermissionCheck = (requiredRoles) => {
  const user = useSelector(state => state.user.user);
  const navigation = useNavigate();

  useEffect(() => {
    if (user && !requiredRoles.includes(user.rol)) {
      navigation('/');
    }
  }, [user, requiredRoles, navigation]);

  return user;
};

export default usePermissionCheck;
