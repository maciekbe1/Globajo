import React from "react";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

export default function Homepage() {
  const { enqueueSnackbar } = useSnackbar();
  const testNotify = () => {
    enqueueSnackbar("Lorem Ipsum", {
      variant: "error",
      preventDuplicate: true
    });
  };

  return (
    <div>
      Homepage Component <button onClick={testNotify}>snackbar</button>
      <Link to="/signin">Signin</Link>
    </div>
  );
}
