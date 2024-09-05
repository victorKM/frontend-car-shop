import './card.css'

interface CardProps {
  price: number,
  company: string,
  name: string,
  image: string,
}

export function Card({price, image, name, company}: CardProps) {
  return (
    <div className="card">
      <img src={image}/>
      <h2>{name}</h2>
      <h3>{company}</h3>
      <p><b>Valor: </b>R$ {price}</p>
    </div>
  );
}
