import { render, fireEvent, screen } from "@testing-library/react";
import FavouritesBtn from "../components/FavouritesBtn";

describe("FavouritesBtn Component", () => {
  it("initially renders as not favourited", () => {
    render(<FavouritesBtn cardId={1} />);
    const favouriteBtn = screen.getByText("Favourite");
    expect(favouriteBtn).toBeInTheDocument();
    expect(favouriteBtn).not.toHaveClass(
      "hover-items__favourite-btn--favourited"
    );
  });

  it("toggles the favourited state when clicked", async () => {
    render(<FavouritesBtn cardId={1} />);
    const favouriteBtn = screen.getByText("Favourite");

    fireEvent.click(favouriteBtn);

    expect(favouriteBtn).toHaveClass("hover-items__favourite-btn--favourited");

    // Click again to toggle off
    fireEvent.click(favouriteBtn);

    expect(favouriteBtn).not.toHaveClass(
      "hover-items__favourite-btn--favourited"
    );
  });
});
