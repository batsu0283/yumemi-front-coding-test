import { usePopulations } from "./usePopulations";
import { usePrefectures } from "./usePrefectures";

function App() {
  const { prefectures } = usePrefectures();
  const { populations, handlePrefectureCheckBox } = usePopulations();
  console.log(populations);

  return (
    <>
      <h1>都道府県一覧</h1>
      <ul>
        {prefectures.map((prefecture) => (
          <li key={prefecture.prefCode}>
            <label>
              <input
                type="checkbox"
                onChange={() => handlePrefectureCheckBox(prefecture.prefCode)}
              />
              {prefecture.prefName}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
