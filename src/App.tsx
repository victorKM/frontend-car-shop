import { useRef, useState } from "react";
import "./App.css";
import { Card } from "./componentes/card/card";
import { useCarData } from "./hooks/useCarData";
import { useCategoryData } from "./hooks/useCategoryData";
import { CreateModal } from "./componentes/create-modal/create-modal";
import makeAnimated from "react-select/animated"
import Select from 'react-select'

function App() {
  const { categories } = useCategoryData();
  const [isModalOpen, setIsModalOpen]= useState(false);

  const [selectedCategoriesOptions, setselectedCategoriesOptions] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState("");

  const [selectedSortOptions , setSelectedSortOptions] = useState([])
  const [sort, setSort] = useState("");

  const [search, setSearch] = useState("");
  
  const { cars } = useCarData(search, categoriesNames, sort);
  
  const animatedComponents = makeAnimated();

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  const handleSearch = (value) => {
    setSearch(value); 
  };

  const handleSelectCategoryChange = (item) => {
    setselectedCategoriesOptions(item);
    const selectedValuesString = item.map(option => option.label).join(',');
    setCategoriesNames(selectedValuesString);
  };

  const handleSelectSortChange = (item) => {
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
        <div className="container">
          <h1>Carros Disponíveis</h1>
          <div className="card-grid">
          {cars?.map(carData => {
            const categoriesString = carData.categories.map(category => category.name).join(', ');
            return (
              <Card 
                price={carData.price}
                name={carData.name}
                company={carData.company}
                image={carData.imageUrl}
                categories={categoriesString}
              />
            );
          })}
          </div>
          {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
          <button onClick={handleOpenModal}>Novo</button>
        </div>
      </>
  );
}

export default App;