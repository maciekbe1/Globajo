import React from "react";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import Modal from "../utils/Modal";

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
      <Link to="/signin">SignIn</Link>
      <Link to="/signup">SignUp</Link>
      <Modal
        activator={({ setShow }) => (
          <button type="button" onClick={() => setShow(true)}>
            Otworz modal
          </button>
        )}
      >
        <ModalContent />
      </Modal>
    </div>
  );
}

const ModalContent = ({ setShow }) => {
  return (
    <div>
      <div>Content</div>
      <button onClick={() => setShow(false)}>Cancel</button>
    </div>
  );
};
