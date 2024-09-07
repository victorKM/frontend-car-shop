import { useEffect, useState } from "react";
import { useCarDataMutate } from "../../hooks/useCarDataMutate";
import { CarData } from "../../interface/CarData";
import makeAnimated from "react-select/animated"
import Select from 'react-select'

import "./modal.css"
import { useCategoryData } from "../../hooks/useCategoryData";

interface InputProps {
  label: string,
  value: string | number,
  updateValue(value:any): void
}

interface ModalProps {
  closeModal(): void
}

const Input = ({label, value, updateValue}: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input value = {value} onChange={event => updateValue(event.target.value)}></input>
    </>
  )
}

export function CreateModal({ closeModal }: ModalProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const { mutate, isSuccess} = useCarDataMutate();
  const [selectedCategoriesOptions, setSelectedCategoriesOptions] = useState([]);
  const [categoriesIds, setCategoriesIds] = useState([]);

  const { categories } = useCategoryData();

  const animatedComponents = makeAnimated();

  const submit = () => {
    const carData: CarData = {
      name,
      company,
      price,
      imageUrl,
      categoriesIds,
    }
    console.log(carData);
    mutate(carData);
  }

  const handleSelectCategoryChange = (item) => {
    const selectedIdCategories = item ? item.map((option) => option.value) : [];
    setCategoriesIds(selectedIdCategories);
    setSelectedCategoriesOptions(item);
    console.log(categoriesIds);
  };

  const categoriesOptions = categories?.map(category => ({
    value: category.id,
    label: category.name
  }))

  useEffect(() => {
    if(!isSuccess) return 
    closeModal();
}, [isSuccess])

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Cadastre um novo carro na loja</h2>
        <form className="input-container">
          <Input label="name" value={name} updateValue={setName}></Input>
          <Input label="company" value={company} updateValue={setCompany}></Input>
          <Input label="price" value={price} updateValue={setPrice}></Input>
          <Input label="imageUrl" value={imageUrl} updateValue={setImageUrl}></Input>
          <div className="select-container">
            <p className="">categorias</p>
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
                className="select"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: '6px',
                    borderRadius: '12px',
                    border: '2px solid #c6c5c5c5'
                  }),
                  option: (provided) => ({
                    ...provided,
                    padding: '10px',
                  })
                  
                }}
              />
          </div>
        </form>
        <button onClick={submit} className="btn-secondary">Cadastrar
        </button>
      </div>
    </div>
  );
}
