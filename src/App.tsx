import './App.css';
import Chart from './components/Chart';
import LoginForm from './components/LoginForm';
import useWebSocket from './useWebSocket';

function App() {
  const { data, previousValues } = useWebSocket();

  return (
    <div>
      <LoginForm />
      <Chart data={data} previousValues={previousValues} />
    </div>
  );
}

export default App;
