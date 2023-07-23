import React, { createContext, useState } from 'react';

export const AppContext = createContext({});


const INITIAL_PROFILE = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@gmail.com',
};

export const AppProvider: React.FC<any> = ({ children }) => {
  const [profile, setProfile] = useState(INITIAL_PROFILE);

  return (
    <AppContext.Provider value={{ profile, setProfile }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
