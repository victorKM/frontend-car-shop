import { useEffect, useState } from "react";
import { useCarDataMutate } from "../../hooks/useCarDataMutate";
import { CarData } from "../../interface/CarData";

import "./modal.css"

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

  const submit = () => {
    const carData: CarData = {
      name,
      company,
      price,
      imageUrl,
    }
    mutate(carData);
  }

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
        </form>
        <button onClick={submit} className="btn-secondary">Cadastrar
        </button>
      </div>
    </div>
  );
}
