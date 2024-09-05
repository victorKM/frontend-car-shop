import { useState } from "react";
import "./App.css";
import { Card } from "./componentes/card/card";
import { useCarData } from "./hooks/useCarData";
import { CreateModal } from "./componentes/create-modal/create-modal";

function App() {
  const { data } = useCarData();
  const [isModalOpen, setIsModalOpen]= useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
      <div className="container">
        <h1>Carros Disponíveis</h1>
        <div className="card-grid">
          {data?.map(carData => 
            <Card 
              price={carData.price}
              name={carData.name}
              company={carData.company}
              image={carData.imageUrl}
            />
            )}
        </div>
        {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
        <button onClick={handleOpenModal}>Novo</button>
      </div>
  );
}

export default App;
