import { useEffect , useState } from 'react';
import './App.css';
import Card from './components/Card';
import Puppies from './components/Puppies';
import Navbar from './components/Navbar';
import { IPuppies } from "./types/types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AddPuppies from './components/AddPuppies';
import EditPuppies from './components/EditPuppies';



function App() {
  const [puppiesArr, setPuppiesArr] = useState<IPuppies[]>([])
  
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000/api/puppies");
      const data = await res.json();
      console.log("dataaa",data);
      setPuppiesArr(data);
    }
    getData();
  },[puppiesArr.length + 1])
  
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact>
          <div className="app">
            <Card puppiesArr={puppiesArr} setPuppiesArr={setPuppiesArr}/>
          </div>
        </Route>
        <Route path="/puppies/:id" >
            <Puppies puppiesArr={puppiesArr}/>
        </Route>
         <Route path="/addpuppies" >
            <AddPuppies  puppiesArr={puppiesArr} setPuppiesArr={setPuppiesArr}/>
        </Route>
         <Route path="/editpuppies/:id" >
            <EditPuppies puppiesArr={puppiesArr} setPuppiesArr={setPuppiesArr}/>
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
