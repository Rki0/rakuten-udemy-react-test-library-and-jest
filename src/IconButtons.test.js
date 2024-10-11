import { render, screen } from "@testing-library/react";
import IconButtons from "./IconButtons";

// If you want to find elements which don't contain any text
// You can use "aria-label" attribute to get elements
test("find elements based on label", () => {
  render(<IconButtons />);

  const signInButton = screen.getByRole("button", {
    name: /sign in/i,
  });

  const signOutButton = screen.getByRole("button", {
    name: /sign out/i,
  });

  expect(signInButton).toBeInTheDocument();
  expect(signOutButton).toBeInTheDocument();
});
