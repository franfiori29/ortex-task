import React, { JSXElementConstructor, ReactElement, useEffect, useRef } from "react";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
};

const Modal: React.FC<Props> = ({ setShowModal, showModal, setLoggedIn, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const setRefDisplay = (tag: string) => {
    if (!ref?.current) return;
    ref.current.style.display = tag;
  }

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.display = showModal ? "block" : "none";
  }, [showModal])

  return (
    <div id="myModal" className="modal" ref={ref}>
      <div className="modal-content">
        <span className="close" onClick={() => setShowModal(false)} >
          &times;
        </span>
        {React.cloneElement(children, { setShowModal, showModal, setLoggedIn, setRefDisplay })}
      </div>
    </div>

  )
}

export default Modal;