import { useEffect, useState } from "react";
import { RateData } from "./types";

const useWebSocket = () => {
  const [data, setData] = useState<RateData>();
  const [previousValues, setPreviousValues] = useState<RateData[]>([]);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.tradingeconomics.com/?client=guest:guest");
    ws.addEventListener('open', (e) => {
      ws.send('{"topic": "subscribe", "to": "EURUSD:CUR"}');
    });
    ws.addEventListener('message', function (event) {
      const parsedData: RateData = JSON.parse(event.data);
      if (parsedData.topic === "EURUSD") {
        setData(parsedData);
        setPreviousValues(prev => {
          if (prev.length < 6) return [...prev, parsedData];
          return [...functionalShift(prev), parsedData]
        })
      }
    });
  }, []);

  return { data, previousValues };
}

const functionalShift: <T>(array: T[]) => T[] = array => {
  const copiedArray = [...array];
  copiedArray.shift();
  return copiedArray;
}


export default useWebSocket;