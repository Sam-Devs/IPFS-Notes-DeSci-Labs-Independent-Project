import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages/index";

describe("HomePage", () => {
  it("render homepage", async () => {
    render(<Home />);

    const header = screen.getByRole("heading");
    const headerText = "IPFS Notes";

    expect(header).toHaveTextContent(headerText);
  });

  it('displays a "Submit" button', () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
  });
});
