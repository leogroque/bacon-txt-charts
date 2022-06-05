import { ReadTxt } from '../ReadTxt/ReadTxt';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <h1>Bacon TXT Charts</h1>
      <ReadTxt />
    </header>
  );
};
