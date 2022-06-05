/**
 * Use this docs to modify the line chart.
 * https://recharts.org/en-US/api/LineChart
 */
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import { useData } from '../DataProvider/DataProvider';
import './Charts.css';

export const Charts = () => {
  const { data } = useData();

  if (data.length === 0) {
    return null;
  }

  const lineCommonProps = {
    type: 'monotone',
    dot: false,
  };

  return (
    <div className="ChartsContainer">
      <ResponsiveContainer width="95%" height="95%">
        <LineChart data={data.slice(0, 10000)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 300]} />
          <Tooltip />
          <Legend />
          <Line
            {...lineCommonProps}
            dataKey="resistenciaMedida"
            stroke="#0000FF"
          />
          <Line
            {...lineCommonProps}
            dataKey="pontoDeAlarmeMedio"
            stroke="#FF0000"
          />
          <Line
            {...lineCommonProps}
            dataKey="resistenciaCabo"
            stroke="#FFFF00"
          />
          <Line
            {...lineCommonProps}
            dataKey="resistenciaMinimaTrilhoUmido"
            stroke="#00FF00"
          />
          <Line
            {...lineCommonProps}
            dataKey="pontoDeAlarmeAbsoluto"
            stroke="#800080"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
