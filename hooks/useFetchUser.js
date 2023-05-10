import { useState, useEffect } from 'react';
import useDataWithToken from './useDataWithToken';

const useFetchUser = () => {
  const userData = useDataWithToken();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userData.response) {
      setUser(userData.response.response.user);
    } else if (userData.error) {
      setUser('usuario no encontrado');
    }
  }, [userData]);

  return user;
};

export default useFetchUser;
