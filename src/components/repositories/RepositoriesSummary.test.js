import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("displays information about the repository", () => {
  const repository = {
    language: "Javascript",
    stargazers_count: 5,
    forks: 30,
    open_issues: 1,
  };

  render(<RepositoriesSummary repository={repository} />);

  for (let key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(value)); // If you use "getByText('30')", it will search a component which exactly same with "30", not "30 blabla~". So, you need to make argument more flexible like using RegExp()

    expect(element).toBeInTheDocument();
  }
});