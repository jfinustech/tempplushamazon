import { Routes, Route } from "react-router-dom";
import List from "./components/list";

function App() {
    return (
        <Routes>
            <Route index element={<List />} />
        </Routes>
    );
}

export default App;
