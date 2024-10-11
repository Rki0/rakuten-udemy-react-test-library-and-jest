import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";
import user from "@testing-library/user-event";

function renderComponent() {
  const users = [
    { name: "jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@sam.com" },
  ];

  const { container } = render(<UserList users={users} />);

  return {
    users,
    container,
  };
}

// If you want to "render" component to all of tests, using them in the "beforeEach()" is not good choice
// beforeEach(() => {

// })

test("render one row per user", () => {
  // const users = [
  //   { name: "jane", email: "jane@jane.com" },
  //   { name: "sam", email: "sam@sam.com" },
  // ];

  // // Render the component
  // const { container } = render(<UserList users={users} />);
  const { container } = renderComponent();

  // Find all the rows in the table
  // screen.logTestingPlaygroundURL();
  // const rows = screen.getAllByRole("row"); // if you use this code, you will get all "tr" tags incluidng tags in the "theaad"
  // const rows = within(screen.getByTestId("users")).getAllByRole("row"); // approach 1 : Using "data-testid" attribute to HTML tag. So you need to add some code in component.
  const rows = container.querySelectorAll("tbody tr"); // approach 2 : Using "container" which destructed from "render".

  // Assertion : correct number of rows in the table
  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", () => {
  // const users = [
  //   { name: "jane", email: "jane@jane.com" },
  //   { name: "sam", email: "sam@sam.com" },
  // ];

  // // Render the component
  // render(<UserList users={users} />);
  const { users } = renderComponent();

  // screen.logTestingPlaygroundURL();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
