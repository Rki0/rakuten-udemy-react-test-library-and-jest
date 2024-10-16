import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RepositoriesListItem from "./RepositoriesListItem";

// If you don't want to render the componenet, even if in the test, because of asynchronous problem, you can use jset.mock() to ignore that problem.
// By this code, the test does not render real "FileIcon" component.
// jest.mock("../tree/FileIcon", () => {
//   // Fake Component
//   return () => {
//     return "File Icon Component";
//   };
// });

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "A js library",
    owner: {
      login: "facebook",
    },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test("shows a link to the github homepage for this repository", async () => {
  const { repository } = renderComponent();

  await screen.findByRole("img", { name: "Javascript" });

  const link = screen.getByRole("link", {
    name: /github repository/i,
  });

  expect(link).toHaveAttribute("href", repository.html_url);
});

test("shows a fileicon with the appropriate icon", async () => {
  renderComponent();

  const icon = await screen.findByRole("img", { name: "Javascript" });

  expect(icon).toHaveClass("js-icon");
});

test("show a link to the code editor page", async () => {
  const { repository } = renderComponent();

  await screen.findByRole("img", { name: "Javascript" });

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
