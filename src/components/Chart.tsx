import { RateData } from "../types";
import { Line } from 'react-chartjs-2';
import Spinner from "./Spinner";

interface Props {
  data: RateData | undefined;
  previousValues: RateData[];
};

const Chart: React.FC<Props> = ({ data, previousValues }) => {
  const lineData = {
    labels: previousValues.map(d => new Date(d.dt).toLocaleTimeString()),
    datasets: [{
      label: 'EUR/USD exnge',
      data: previousValues.map(d => d.price),
      options: {
        animation: {
          duration: 0,
          delay: 0
        },
        scales: {
          y: {
            max: 2,
            min: 0
          }
        }
      },
      fill: false,
      borderColor: '#827ffe',
    }]
  };
  return (
    <div className="graph-container">
      {data ?
        <Line type='line' data={lineData} /> :
        <>
          <Spinner />
          <h1>Loading EUR/USD pair</h1>
        </>
      }
    </div>
  )
}

export default Chart;