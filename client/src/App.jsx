import "./App.css";
import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />}></Route>
      <Route path="/:id" element={<Chat />}></Route>
    </Routes>
  );
}

export default App;
