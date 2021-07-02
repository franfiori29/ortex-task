import { useState } from 'react';
import './App.css';
import Chart from './components/Chart';
import Form from './components/Form';
import Modal from './components/Modal';
import useWebSocket from './useWebSocket';

function App() {
  const { data, previousValues } = useWebSocket();
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {showModal &&
        <Modal showModal={showModal} setShowModal={setShowModal} setLoggedIn={setLoggedIn}>
          <Form />
        </Modal>}

      {!loggedIn &&
        <Form showModal={showModal} setShowModal={setShowModal} setLoggedIn={setLoggedIn} />}

      <Chart data={data} previousValues={previousValues} />
    </div>
  );
}

export default App;
