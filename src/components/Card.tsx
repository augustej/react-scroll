import FavouritesBtn from "./FavouritesBtn";
import CardInterface from "../interfaces/interfaces";

interface Props {
  card: CardInterface;
}

const Card: React.FC<Props> = ({ card }) => {
  return (
    <div className="card">
      {/* Items visible only on hover */}
      <div className="card__hover-items hover-items">
        {/* Title */}
        <h2 className="hover-items__title">
          {card.alt ? card.alt : "Water Dog"}
        </h2>

        {/* Divider */}
        <div className="hover-items__divider"></div>

        {/* Author */}
        <h2 className="hover-items__author">{card.photographer}</h2>

        {/* Favourite button */}
        <FavouritesBtn cardId={card.id} />
      </div>

      {/* Always visible image */}
      <img className="card__img" src={card.src["medium"]} alt={card.alt} />
    </div>
  );
};
export default Card;
