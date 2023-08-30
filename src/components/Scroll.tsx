import { useState, useEffect } from "react";
import Card from "./Card";
import CardInterface from "../interfaces/interfaces";

const Scroll = () => {
  // initial variables
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    // listen for scroll event
    window.addEventListener("scroll", userScrolled);
    // before component if removed from DOM, clean up event listener
    return () => window.removeEventListener("scroll", userScrolled);
  }, [isLoading, page]);

  useEffect(() => {
    // get initial data from API
    fetchData(18);
  }, []);

  function userScrolled() {
    const alreadyScrolledHeight = document.documentElement.scrollTop;
    const totalDocumentHeight = document.documentElement.offsetHeight;

    // continue only if user reached bottom of the page =>
    // => and data is not yet being loaded
    if (
      isLoading ||
      window.innerHeight + alreadyScrolledHeight < totalDocumentHeight - 200 ||
      isLoading
    ) {
      return;
    }

    setIsLoading(true);

    // Once user at the bottom, load more images
    fetchData();
  }

  // function to fetch data from API
  const fetchData = async (numberPerPage?: number) => {
    // allows to set more images on first load
    if (!numberPerPage) numberPerPage = 9;

    setError(null);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // N.B. I would hide my authorization key in real app.
        Authorization:
          "YD8stZxsjBpOWNhmFbQ3oyZLC3n7qz448NFGELbmCAzbyTIPKLhTSeVQ",
      },
    };

    try {
      const response = await fetch(
        `https://api.pexels.com/v1/curated?page=${page}&per_page=${numberPerPage}`,
        requestOptions
      );

      //  Pexels blocks too many attemps
      if (response.status === 429) {
        setError("Too many attempts.");
      }

      const newData = await response.json();

      // Pexels API has some duplicate cards
      const newOriginalPhotos = removeDuplicates(newData.photos);

      setPage(page + numberPerPage / 9);
      setCards([...cards, ...newOriginalPhotos]);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeDuplicates = (newPhotos: CardInterface[]) => {
    const originalPhotos = newPhotos.filter((newCard) => {
      const cardIsFound: CardInterface | undefined = cards.find(
        (existingCard) => {
          return existingCard.id === newCard.id;
        }
      );

      return cardIsFound ? false : true;
    });

    return originalPhotos;
  };

  function renderCards() {
    return (
      <div className="scroll-container">
        {cards.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    );
  }

  function renderErrors() {
    if (error) {
      return <p className="error-message">{error}</p>;
    }
  }

  return (
    <>
      {renderErrors()}
      <a href="https://www.pexels.com" className="link">
        Photos provided by Pexels
      </a>
      {renderCards()}
    </>
  );
};

export default Scroll;
