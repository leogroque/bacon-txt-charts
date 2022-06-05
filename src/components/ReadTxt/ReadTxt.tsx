import { useData } from '../DataProvider/DataProvider';

export const ReadTxt = () => {
  const { loadDataFromTxt } = useData();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      loadDataFromTxt(e.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFile} />
    </div>
  );
};
