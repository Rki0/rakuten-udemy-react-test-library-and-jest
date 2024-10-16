import { render, screen, within } from "@testing-library/react";
import FormData from "./FormData";

// Custom matcher
function toContainRole(container, role, quantity = 1) {
  const elements = within(container).queryAllByRole(role);

  if (elements.length === quantity) {
    return {
      pass: true,
    };
  }

  return {
    pass: false,
    message: () =>
      `Expected to find ${quantity} ${role} elements.
Found ${elements.length} instead.`, // custom error message
  };
}

expect.extend({ toContainRole }); // enroll custom matcher to "expect()"

test("the form displays two buttons", () => {
  render(<FormData />);

  const form = screen.getByRole("form");
  const buttons = within(form).getAllByRole("button"); // If you don't use "within()", you will get an error. Because "render()" will catch 3 buttons in the component. But with "within()", you can custom searching boundary.

  expect(buttons).toHaveLength(2);
});

test("automate searching elements using custom matcher", () => {
  render(<FormData />);

  const form = screen.getByRole("form");

  expect(form).toContainRole("button", 2); // custom matcher "toContainRole()"
});
