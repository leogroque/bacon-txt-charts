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
import * as dateFns from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './Charts.css';

const getFormattedDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const Charts = () => {
  const { data = [] } = useData();

  const dates = React.useMemo(() => {
    return [
      ...new Set(data.map((item) => getFormattedDate(new Date(item.date)))),
    ];
  }, [data]);

  const [date, setDate] = React.useState('_');

  const defaultDate = dates[dates.length - 1];

  React.useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);

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
        <span>Selecione a data</span>
        <select
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        >
          {dates.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="95%" height="95%">
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(d) => {
              const date = new Date(d);
              date.setHours(date.getHours() + 3);
              return dateFns.format(date, 'HH:mm');
            }}
          />
          <YAxis domain={[0, 300]} />
          <Tooltip
            labelFormatter={(d) => {
              const date = new Date(d);
              return dateFns.format(date, 'pp - P', { locale: ptBR });
            }}
          />
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
            stroke="#FFCC00"
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
