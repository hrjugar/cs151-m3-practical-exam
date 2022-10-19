import { Route, Routes } from "react-router-dom";
import ProcessingPage from "./Pages/ProcessingPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <div className="App">
      <div className="no-show-mobile">
        <h1>Please use the app on a wider resolution.</h1>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/processing" element={<ProcessingPage />} />
      </Routes>
    </div>
  );
}

export default App;
