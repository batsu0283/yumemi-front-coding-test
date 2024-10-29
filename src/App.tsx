import { usePrefectures } from "./usePrefectures";

function App() {
  const { prefectures } = usePrefectures();

  return (
    <>
      <h1>都道府県一覧</h1>
      <ul>
        {prefectures.map((prefecture) => (
          <li key={prefecture.prefCode}>{prefecture.prefName}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
