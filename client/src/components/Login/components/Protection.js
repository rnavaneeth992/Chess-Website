import React, {useState} from 'react'
import { Navigate , Outlet} from 'react-router-dom'

function Protected({ reqType, children }) {

  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("token"));
  const [userType, setUserType] = useState(localStorage.getItem("utype"));

  console.log(userType)
  console.log(reqType)

  if (isSignedIn == undefined || !isSignedIn || userType != reqType) {
    return <Navigate to="/err-404" replace />
  } 
  return <Outlet />
}
export default Protected