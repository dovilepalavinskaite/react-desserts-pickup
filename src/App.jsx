import './App.css'
import Header from './components/Header.jsx';
import AllDesserts from './components/AllDesserts.jsx';
import { ALL_DESSERTS } from './data.js';

function App() {
  
  return (
    <>
      <Header />
      <AllDesserts desserts={ALL_DESSERTS} />
    </>
  )
}

export default App
 