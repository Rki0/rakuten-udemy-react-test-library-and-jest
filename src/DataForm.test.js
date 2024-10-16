import { render, screen } from "@testing-library/react";
import DataForm from "./DataForm";

test("selecting different elements", () => {
  render(<DataForm />);

  const elements = [
    screen.getByRole("button"),
    screen.getByText("Enter Data"), // or you can use regex : /enter data/i

    screen.getByLabelText("Email"), // or you can use regex
    screen.getByPlaceholderText("Red"),
    screen.getByDisplayValue("asdf@asdf.com"),
    screen.getByAltText("data"),
    screen.getByTitle("Click when ready to submit"), // or you can use regex

    screen.getByTestId("image wrapper"),
  ];

  for (let element of elements) {
    expect(element).toBeInTheDocument();
  }
});
