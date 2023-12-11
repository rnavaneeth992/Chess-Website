import { createContext, useState } from "react";

const ParentContext = createContext();

const ParentContextProvider = ({ children }) => {
  
 const [currentStudent, setCurrentStudent] = useState(undefined);
 const [userData, setUserData] = useState({name: "Parent", email: "", phone: ""});
  return (
    <ParentContext.Provider value={{ currentStudent, setCurrentStudent, userData, setUserData }}>
      {children}
    </ParentContext.Provider>
  );
};

export { ParentContext, ParentContextProvider };