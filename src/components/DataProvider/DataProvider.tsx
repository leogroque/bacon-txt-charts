import * as React from 'react';

type Item = {
  date: string;
  segundoDado: number;
  tensaoPainelSolar: number;
  correntePainelSolar: number;
  tensaoBateria: number;
  correnteBateria: number;
  tensaoAlvo: number;
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
  segundoDado: 1,
  dia: 5,
  mes: 6,
  ano: 7,
  hora: 8,
  minuto: 9,
  segundo: 10,
  tensaoPainelSolar: 12,
  correntePainelSolar: 13,
  tensaoBateria: 14,
  correnteBateria: 15,
  tensaoAlvo: 18,
};

type DataMapKeys = keyof typeof dataMap;

const getSingleItemFromRow = (row: string): Item | undefined => {
  const columns = row.split(';');

  const mappedData = Object.entries(dataMap).reduce<{
    [key in DataMapKeys]: number;
  }>((acc, [key, column]) => {
    acc[key as DataMapKeys] = Number(columns[column]);
    return acc;
  }, {} as any);

  if (Object.values(mappedData).some((value) => isNaN(value))) {
    return undefined;
  }

  const date = new Date(
    mappedData.ano + 2000,
    mappedData.mes - 1,
    mappedData.dia,
    mappedData.hora - 3,
    mappedData.minuto,
    mappedData.segundo
  );

  return {
    ...mappedData,
    date: date.toISOString(),
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
      .filter((item): item is Item => item !== undefined)
      .filter((item) => item.segundoDado === 4)
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
