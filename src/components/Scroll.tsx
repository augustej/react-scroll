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
  }, [isLoading]);

  useEffect(() => {
    // get initial data from API
    fetchData();
  }, []);

  async function userScrolled() {
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
    await fetchData();
  }

  // function to fetch data from API
  const fetchData = async () => {
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
        `https://api.pexels.com/v1/curated?page=${page}&per_page=9`,
        requestOptions
      );

      //  Pexels blocks too many attemps
      if (response.status === 429) {
        setError("Too many attempts.");
      }

      const newData = await response.json();

      setPage(page + 1);
      setCards([...cards, ...newData.photos]);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
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
    <div>
      {renderErrors()}
      {renderCards()}
    </div>
  );
};

export default Scroll;
