import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  (window as unknown as { navigate: (path: string) => void }).navigate =
    navigate;

  const element = useRoutes(routes);
  return element;
}

export default App;
