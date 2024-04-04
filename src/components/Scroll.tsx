import { useState, useEffect } from "react";
import Card from "./Card";
import CardInterface from "../interfaces/interfaces";

const Scroll = () => {
  // initial variables
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const itemsPerPageDefaultNumber = 9;

  useEffect(() => {
    // listen for scroll event
    window.addEventListener("scroll", userScrolled);
    // clean up event listener
    return () => window.removeEventListener("scroll", userScrolled);
  }, [isLoading, page]);

  useEffect(() => {
    // get initial data from API
    // get more images on first load by provding [numberPerPage]
    fetchData(itemsPerPageDefaultNumber * 2);
  }, []);

  function userScrolled() {
    const alreadyScrolledHeight = document.documentElement.scrollTop;
    const totalDocumentHeight = document.documentElement.offsetHeight;

    // fetch data only if user reached (bottom of the document - 500px) =>
    // => and data is not yet being loaded
    if (
      isLoading ||
      window.innerHeight + alreadyScrolledHeight < totalDocumentHeight - 500 ||
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
    // determine how many items per page to load
    if (!numberPerPage) numberPerPage = itemsPerPageDefaultNumber;

    setError(null);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
        `${process.env.AUTHORIZATION_KEY}`
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

      // Remove same photos from screen. Pexels API provides some duplicates.
      const newOriginalPhotos = removeDuplicates(newData.photos);

      setPage(page + numberPerPage / itemsPerPageDefaultNumber);
      setCards([...cards, ...newOriginalPhotos]);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeDuplicates = (newPhotos: CardInterface[]) => {
    // filter new data batch to remove photos that are already on the screen
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
