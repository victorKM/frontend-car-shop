import './card.css'

interface CardProps {
  price: number,
  company: string,
  name: string,
  image: string,
  categories: string,
}

export function Card({price, image, name, company, categories}: CardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);


  return (
    <div className="card">
      <img src={image}/>
      <h2>{name}</h2>
      <h3>{company}</h3>
      <p><b>Valor: </b>{formattedPrice}</p>
      <p><b>Categorias: </b>{categories}</p> 
    </div>
  );  
}
