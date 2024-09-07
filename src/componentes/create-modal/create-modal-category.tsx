import { useEffect, useState } from "react";
import { useCategoryDataMutate } from "../../hooks/useCategoryDataMutate";
import { CategoryData } from "../../interface/CategoryData";

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
      <input required value = {value} onChange={event => updateValue(event.target.value)}></input>
    </>
  )
}

export function CreateModalCategory({ closeModal }: ModalProps) {
  const [name, setName] = useState("");
  const { mutate, isSuccess} = useCategoryDataMutate();

  const submit = () => {
    const categoryData: CategoryData = {
      name,
    }
    mutate(categoryData);
  }

  useEffect(() => {
    if(!isSuccess) return 
    closeModal();
}, [isSuccess])

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Cadastre uma nova categoria</h2>
        <form className="input-container">
          <Input label="name" value={name} updateValue={setName}></Input>
        </form>
        <button onClick={submit} className="btn-secondary">Cadastrar
        </button>
      </div>
    </div>
  );
}
