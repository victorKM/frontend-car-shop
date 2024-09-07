import { useState } from "react";
import "./App.css";
import { Card } from "./componentes/card/card";
import { useCarData } from "./hooks/useCarData";
import { useCategoryData } from "./hooks/useCategoryData";
import { CreateModalCar } from "./componentes/create-modal/create-modal-car";
import { CreateModalCategory } from "./componentes/create-modal/create-modal-category";
import makeAnimated from "react-select/animated"
import Select from 'react-select'
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { categories } = useCategoryData();
  const [isCarModalOpen, setIsCarModalOpen]= useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen]= useState(false);

  const [selectedCategoriesOptions, setselectedCategoriesOptions] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState("");

  const [selectedSortOptions , setSelectedSortOptions] = useState([])
  const [sort, setSort] = useState("");

  const [search, setSearch] = useState("");
  
  const { cars } = useCarData(search, categoriesNames, sort);
  
  const animatedComponents = makeAnimated();

  const handleOpenCarModal = () => {
    setIsCarModalOpen(prev => !prev)
  }

  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(prev => !prev)
  }

  const handleSearch = (value: string) => {
    setSearch(value); 
  };

  const handleSelectCategoryChange = (item: any) => {
    setselectedCategoriesOptions(item);
    const selectedValuesString = item.map((option: { label: any }) => option.label).join(',');
    setCategoriesNames(selectedValuesString);
  };

  const handleSelectSortChange = (item: any) => {
    setSelectedSortOptions(item);
    const selectedValueString = item.value;
    setSort(selectedValueString);
  };

  const handleClear = () => {
    setSearch("");
    setCategoriesNames("");
    setSort("");
    setselectedCategoriesOptions([]);
    setSelectedSortOptions([]);
  }

  const categoriesOptions = categories?.map(category => ({
    value: category.id,
    label: category.name
  }))

  const sortOptions = [
    {
      value: "asc,price",
      label: "Mais barato"
    },
    {
      value: "desc,price",
      label: "Mais caro"
    },
    {
      value: "asc,name",
      label: "A-Z"
    },
    {
      value: "desc,name",
      label: "Z-A"
    },
]

  return (
      <>
        <div className="header-grid">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-bar"
            />
          </div> 
          <Select 
            value={selectedCategoriesOptions}
            components={animatedComponents}
            options={categoriesOptions} 
            isMulti 
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={false}
            onChange={handleSelectCategoryChange}
          />
          <Select 
            value={selectedSortOptions}
            components={animatedComponents}
            options={sortOptions}  
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            onChange={handleSelectSortChange}
          />
          <button className="search-button" onClick={handleClear}>Limpar</button>
        </div>
        <h1 className="container-title">Carros Disponíveis</h1>
        <div className="container">
          <div className="card-grid">
            <AnimatePresence>
              {cars?.map(carData => {
                const categoriesString = carData.categories.map(category => category.name).join(', ');
                return (
                  <motion.div
                    key={carData.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card 
                      price={carData.price}
                      name={carData.name}
                      company={carData.company}
                      image={carData.imageUrl}
                      categories={categoriesString}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {isCarModalOpen && <CreateModalCar closeModal={handleOpenCarModal}/>}
          <button className="right-button"onClick={handleOpenCarModal}>Novo carro</button>

          {isCategoryModalOpen && <CreateModalCategory closeModal={handleOpenCategoryModal}/>}
          <button className="left-button"onClick={handleOpenCategoryModal}>Nova categoria</button>
        </div>
      </>
  );
}

export default App;