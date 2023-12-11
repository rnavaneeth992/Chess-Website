import { Outlet } from 'react-router-dom';

import { ParentContextProvider } from './ParentContext';
const ParentContextLayout = () => {

  return (
    <ParentContextProvider>
      <Outlet />
    </ParentContextProvider>
  );
};

export default ParentContextLayout;