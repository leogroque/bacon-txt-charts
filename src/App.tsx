import { Charts } from './components/Charts/Charts';
import { DataProvider } from './components/DataProvider/DataProvider';
import { Header } from './components/Header/Header';
import { ReadTxt } from './components/ReadTxt/ReadTxt';
import './App.css';

export const App = () => {
  return (
    <DataProvider>
      <div className="App">
        <Header />
        <ReadTxt />
        <Charts />
      </div>
    </DataProvider>
  );
};
