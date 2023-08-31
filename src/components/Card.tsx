import FavouritesBtn from "./FavouritesBtn";
import CardInterface from "../interfaces/interfaces";
import { useState } from "react";

interface Props {
  card: CardInterface;
}

const Card: React.FC<Props> = ({ card }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

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

      {/* Image */}
      <div className="card__img-wrapper">
        <picture>
          <source media="(max-width: 750px)" srcSet={card.src["large"]} />
          <source media="(max-width: 1099px)" srcSet={card.src["large2x"]} />

          <img
            className={`card__img ${imgLoaded ? "card__img--loaded" : ""}`}
            src={card.src["large"]}
            alt={card.alt}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
        </picture>
      </div>
    </div>
  );
};
export default Card;
