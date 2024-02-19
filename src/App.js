import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "../state";
import { About } from "./Steps/About";
import { Stepper } from "./Steps/Stepper";


function App() {
  return (
    <div className="App">
     <AppProvider>
        <Router>
         <Stepper />
          <Routes>
            <Route path="/" element={<About />} />
          </Routes>
           
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
