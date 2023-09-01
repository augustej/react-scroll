import { render, act } from "@testing-library/react";
import Scroll from "../components/Scroll";

describe("Scroll Component", () => {
  it("fetches initial cards from API", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ photos: [] }), // Mock empty data
      })
    );

    global.fetch = mockFetch;

    await act(async () => {
      render(<Scroll />);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("page=1&per_page="), // Check if the URL contains "page=1&per_page="
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: expect.any(String),
        }),
      })
    );
  });
});
