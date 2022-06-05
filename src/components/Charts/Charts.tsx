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

  return (
    <div className="ChartsContainer">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data.slice(0, 1000)}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="resistenciaMedida"
            stroke="#0000FF"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="pontoDeAlarmeMedio"
            stroke="#FF0000"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="resistenciaCabo"
            stroke="#FFFF00"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="resistenciaMinimaTrilhoUmido"
            stroke="#00FF00"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="pontoDeAlarmeAbsoluto"
            stroke="#800080"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
