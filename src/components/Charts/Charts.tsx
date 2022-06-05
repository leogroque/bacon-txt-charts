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
import * as React from 'react';
import './Charts.css';

const getFormattedDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const Charts = () => {
  const { data } = useData();

  const [date, setDate] = React.useState(getFormattedDate(new Date()));

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      return item.date.startsWith(date);
    });
  }, [data, date]);

  if (data.length === 0) {
    return null;
  }

  const lineCommonProps = {
    type: 'monotone',
    dot: false,
  };

  return (
    <div className="ChartsContainer">
      <div>
        <span>Selecione a data: {date}</span>
        <input
          type="date"
          value={date}
          min={getFormattedDate(new Date(data[0].date))}
          max={getFormattedDate(new Date(data[data.length - 1].date))}
          onChange={(e) => {
            setDate(getFormattedDate(new Date(e.target.value)));
          }}
        />
      </div>
      <ResponsiveContainer width="95%" height="95%">
        <LineChart data={filteredData}>
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
