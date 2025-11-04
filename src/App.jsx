import { useState, useEffect } from 'react';
import './App.css'
import Header from './components/Header.jsx';
import DessertsList from './components/DessertsList.jsx';
import { ALL_DESSERTS } from './data.js';

function App() {
  const [selectedDesserts, setSelectedDesserts] = useState(() => {
    const saved = localStorage.getItem('selectedDesserts');
    return saved ? JSON.parse(saved) : []
  });

  useEffect(() => {
    localStorage.setItem('selectedDesserts', JSON.stringify(selectedDesserts));
  }, [selectedDesserts]);

  function handleSelectDessert(id) {
    const dessert = ALL_DESSERTS.find((item) => item.id === id);
    if (!dessert) return; 
    const alreadySelected = selectedDesserts.some((d) => d.id === id);
    if (alreadySelected) return;
    setSelectedDesserts((prev) => [...prev, dessert]);
  }

  return (
    <>
      <Header />
      <DessertsList 
        desserts={selectedDesserts} 
        selectDessert={handleSelectDessert} 
        titleText="Selected deserts"
      />
      <DessertsList 
        desserts={ALL_DESSERTS} 
        selectDessert={handleSelectDessert}
        titleText="All our desserts!" 
      />
    </>
  )
}

export default App
 