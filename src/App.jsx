import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css'
import Header from './components/Header.jsx';
import DessertsList from './components/DessertsList.jsx';
import DeleteModal from './components/DeleteModal.jsx';
import { ALL_DESSERTS } from './data.js';

function App() {
  const selectedDessert = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  function handleStartRemoveDessert(id) {
    setModalIsOpen(true);
    selectedDessert.current = id;
  }

  function handleStopRemoveDessert() {
    setModalIsOpen(false);
  }

  const handleDeleteDessert = useCallback(function handleDeleteDessert() {
    setSelectedDesserts((prevSelectedDesserts) =>
      prevSelectedDesserts.filter((dessert) => dessert.id !== selectedDessert.current)
  );
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem('selectedDesserts')) || [];
    localStorage.setItem(
      'selectedDesserts',
      JSON.stringify(storedIds.filter((id) => id !== selectedDessert.current)))
  }, [])

  return (
    <>
      <Header />
      <DeleteModal 
        open={modalIsOpen}
        onClick={handleStopRemoveDessert}
        onCancel={handleStopRemoveDessert}
        onConfirm={handleDeleteDessert} 
      />
      <DessertsList 
        desserts={selectedDesserts} 
        onDessertClick={handleStartRemoveDessert} 
        titleText="Selected deserts"
      />
      <DessertsList 
        desserts={ALL_DESSERTS} 
        onDessertClick={handleSelectDessert}
        titleText="All our desserts!" 
      />
    </>
  )
}

export default App
 