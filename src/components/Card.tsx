import FavouritesBtn from "./FavouritesBtn";
import CardInterface from "../interfaces/interfaces";

interface Props {
  card: CardInterface;
}

const Card: React.FC<Props> = ({ card }) => {
  return (
    <div className="card">
      <div className="card__hover-items hover-items">
        <h2 className="hover-items__title">
          {card.alt ? card.alt : "Nice Image"}
        </h2>
        <div className="hover-items__divider"></div>
        <h2 className="hover-items__author">{card.photographer}</h2>
        <FavouritesBtn cardId={card.id} />
      </div>
      <img className="card__img" src={card.src["medium"]} alt={card.alt} />
    </div>
  );
};
export default Card;
