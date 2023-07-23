import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext({
  profile: {
    id: null,
    name: '',
    email: '',
  },
  isLogged: false,

  setProfile: (profile: any) => {},
  setIsLogged: (isLogged: boolean) => {},
});


const INITIAL_PROFILE = {
  id: null,
  name: '',
  email: '',
};

export const AppProvider: React.FC<any> = ({ children }) => {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("access_token"))
      setIsLogged(true);
  }, []);

  return (
    <AppContext.Provider value={{
      profile, setProfile,
      isLogged, setIsLogged,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
