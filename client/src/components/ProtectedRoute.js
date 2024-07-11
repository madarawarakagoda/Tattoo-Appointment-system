
import React from 'react';
import { Navigate } from 'react-router-dom';



export default function ProtectedRoute({Children}) 
{ 
  if(localStorage.getItem("token")){
    return Children;

  }else{
    return <Navigate to="/login" />;

  }
}
