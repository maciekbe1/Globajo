import React from "react";
import { signOut } from "store/actions/userActions";
import { useDispatch } from "react-redux";
export default function ProtectedTest() {
  const dispatch = useDispatch();
  const signOutUser = () => {
    dispatch(signOut());
  };
  return (
    <div>
      Welcome in protected page <button onClick={signOutUser}>Sign out</button>
    </div>
  );
}
