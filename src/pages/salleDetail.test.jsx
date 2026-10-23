import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SalleDetail from "./salleDetail";

vi.mock("../services/nasaApi", () => ({
  getMediasFromNASA: vi.fn(),
}));

import { getMediasFromNASA } from "../services/nasaApi";

describe("SalleDetail page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads and displays a room's media in date order", async () => {
    getMediasFromNASA.mockResolvedValue([
      {
        id: "newer",
        title: "Mission récente",
        date: "2020-01-01",
        thumbUrl: "https://example.com/newer.jpg",
      },
      {
        id: "older",
        title: "Mission ancienne",
        date: "1969-07-20",
        thumbUrl: "https://example.com/older.jpg",
      },
    ]);

    render(
      <MemoryRouter initialEntries={["/salles/apollo"]}>
        <Routes>
          <Route path="/salles/:id" element={<SalleDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    const olderMedia = await screen.findByRole("link", { name: "Mission ancienne" });
    const newerMedia = screen.getByRole("link", { name: "Mission récente" });

    expect(olderMedia.compareDocumentPosition(newerMedia)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(getMediasFromNASA).toHaveBeenCalledWith("apollo");
  });
});
