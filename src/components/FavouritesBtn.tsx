import { useEffect, useState } from "react";

interface Props {
  cardId: number;
}

const FavouritesBtn: React.FC<Props> = ({ cardId }) => {
  const [favourite, setfavourite] = useState(false);

  useEffect(() => {
    initialCheckIffavourited();
  }, []);

  const initialCheckIffavourited = () => {
    // no favourites at all
    if (!localStorage.favourites) {
      setfavourite(false);
      return;
    }

    let favouritedItems = JSON.parse(localStorage.favourites);

    // search among favourites
    let favourited = favouritedItems.find(
      (favouritedId: number) => favouritedId === cardId
    );

    setfavourite(favourited);
  };

  const favouriteClicked = () => {
    // create favourites in local storage if there is none
    if (!localStorage.favourites) {
      createFavouritesInLocalStorage(cardId);
      return;
    }

    let favouritedItems = JSON.parse(localStorage.favourites);

    // Remove from favourites
    if (favourite) {
      removeFromFavourites(cardId, favouritedItems);
      return;
    }

    // Add to favourites
    addToFavourites(cardId, favouritedItems);
  };

  const removeFromFavourites = (id: number, favouritedItems: number[]) => {
    let favouritesWithoutClickedOne = favouritedItems.filter(
      (favouritedId) => favouritedId !== id
    );

    localStorage.favourites = JSON.stringify(favouritesWithoutClickedOne);
    setfavourite(false);
  };

  const createFavouritesInLocalStorage = (id: number) => {
    localStorage.favourites = JSON.stringify([id]);
  };

  const addToFavourites = (id: number, favouritedItems: number[]) => {
    localStorage.favourites = JSON.stringify([...favouritedItems, id]);
    setfavourite(true);
  };

  return (
    <button
      className={`hover-items__favourite-btn ${
        favourite ? "hover-items__favourite-btn--favourited" : ""
      }`}
      onClick={() => favouriteClicked()}
    >
      Favourite
    </button>
  );
};
export default FavouritesBtn;
