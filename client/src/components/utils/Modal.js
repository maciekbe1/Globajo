import React, { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
const Dialog = styled.div`
  position: fixed;
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;
const BlackOverlay = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 60%;
`;
const DialogContent = styled.div`
  position: relative;
  width: 500px;
  background: #fff;
`;
const Modal = ({ children, activator }) => {
  const [show, setShow] = useState(false);

  const content = show && (
    <Dialog>
      <BlackOverlay></BlackOverlay>
      <DialogContent>{React.cloneElement(children, { setShow })}</DialogContent>
    </Dialog>
  );

  return (
    <>
      {activator({ setShow })}
      {createPortal(content, document.body)}
    </>
  );
};
export default Modal;
