import * as React from 'react';

type Item = {
  date: string;
  resistenciaMedida: number;
  pontoDeAlarmeMedio: number;
  resistenciaCabo: number;
  resistenciaMinimaTrilhoUmido: number;
  pontoDeAlarmeAbsoluto: number;
};

type Data = Item[];

const DataContext = React.createContext<{
  data: Data;
  loadDataFromTxt: (file: string) => void;
}>({ loadDataFromTxt: () => {}, data: [] });

/**
 * The data item and its respective column index.
 *
 * 6 - dia
 * 7 - mês
 * 8 - ano
 * 9 - hora
 * 10 - minuto
 * 11 - segundo
 * 15 - Resistência medida (linha azul no gráfico)
 * 19 - ponto de alarme média( linha vermelha)
 * 20 - resistência cabo ( linha amarela)
 * 21 - resistência mínima trilho úmido (linha verde)
 * 22 - ponto de alarme absoluto (linha roxa)
 */
const dataMap = {
  dia: 5,
  mes: 6,
  ano: 7,
  hora: 8,
  minuto: 9,
  segundo: 10,
  resistenciaMedida: 14,
  pontoDeAlarmeMedio: 18,
  resistenciaCabo: 19,
  resistenciaMinimaTrilhoUmido: 20,
  pontoDeAlarmeAbsoluto: 21,
};

type DataMapKeys = keyof typeof dataMap;

const getSingleItemFromRow = (row: string): Item => {
  const columns = row.split(';');

  const mappedData = Object.entries(dataMap).reduce<{
    [key in DataMapKeys]: string;
  }>((acc, [key, column]) => {
    acc[key as DataMapKeys] = columns[column];
    return acc;
  }, {} as any);

  const date = `${mappedData.ano}-${mappedData.mes}-${mappedData.dia} ${mappedData.hora}:${mappedData.minuto}:${mappedData.segundo}`;

  return {
    date,
    resistenciaMedida: Number(mappedData.resistenciaMedida),
    pontoDeAlarmeMedio: Number(mappedData.pontoDeAlarmeMedio),
    resistenciaCabo: Number(mappedData.resistenciaCabo),
    resistenciaMinimaTrilhoUmido: Number(
      mappedData.resistenciaMinimaTrilhoUmido
    ),
    pontoDeAlarmeAbsoluto: Number(mappedData.pontoDeAlarmeAbsoluto),
  };
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = React.useState<Data>([]);

  const loadDataFromTxt = (data: string) => {
    const rows = data.split('\n');

    const finalData = rows
      .map((row) => {
        return getSingleItemFromRow(row);
      })
      /**
       * Sort by date.
       */
      .sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      });

    setData(finalData);
  };

  return (
    <DataContext.Provider value={{ loadDataFromTxt, data }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => React.useContext(DataContext);
