import React, { useState, useEffect } from "react";
import { verifyService } from "services/userService";

export default function AccountVerify(props) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    verifyService(props.match.params.hash)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  }, [props.match.params.hash]);

  return <div>{message}</div>;
}
