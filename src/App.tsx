import { useState } from 'react';
import './App.css';
import Chart from './components/Chart';
import LoginForm from './components/LoginForm';
import Modal from './components/Modal';
import useWebSocket from './useWebSocket';

function App() {
  const { data, previousValues } = useWebSocket();
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {!loggedIn && <LoginForm setShow={setShowModal} />}
      {showModal &&
        <Modal show={showModal} setShow={setShowModal} setLoggedIn={setLoggedIn} />}
      <Chart data={data} previousValues={previousValues} />
    </div>
  );
}

export default App;
