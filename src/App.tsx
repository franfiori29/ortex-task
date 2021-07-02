import './App.css';
import useWebSocket from './useWebSocket';

function App() {
  const data = useWebSocket();

  if (!data) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>
        Time: {new Date(data.dt).toLocaleTimeString()}
      </h1>
      <h1>
        Price: {data.price}
      </h1>
    </div>
  );
}

export default App;
