import { useEffect, useState } from "react";

export interface RootObject {
  s: string;
  i: string;
  pch: number;
  nch: number;
  bid: number;
  ask: number;
  price: number;
  dt: number;
  state: string;
  type: string;
  dhigh: number;
  dlow: number;
  o: number;
  prev: number;
  topic: string;
}


const useWebSocket = () => {
  const [data, setData] = useState<RootObject>();

  useEffect(() => {
    const ws = new WebSocket("wss://stream.tradingeconomics.com/?client=guest:guest");
    ws.addEventListener('open', (e) => {
      ws.send('{"topic": "subscribe", "to": "EURUSD:CUR"}');
    });
    ws.addEventListener('message', function (event) {
      const data: RootObject = JSON.parse(event.data);
      if (data.topic === "EURUSD") {
        setData(data);
      }
    });
  }, []);

  return data;
}

export default useWebSocket;