import { render, screen } from "@testing-library/react";
import ColorList from "./ColorList";
import LoadableColorList from "./LoadableColorList";

// getBy, getAllBy : Prove an element exists
// queryBy, queryAllBy : Prove an element does not exist
// findBy, findAllBy : Make sure an element eventually exists

test("getBy, queryBy, findBy finding 0 elements", async () => {
  render(<ColorList />);

  // It will pass the test when there is no element

  expect(() => screen.getByRole("textbox")).toThrow();

  expect(screen.queryByRole("textbox")).toEqual(null);

  let errorThrown = false;

  try {
    await screen.findByRole("textbox");
  } catch (err) {
    errorThrown = true;
  }

  expect(errorThrown).toEqual(true);
});

test("getBy, queryBy, findBy when they find 1 element", async () => {
  render(<ColorList />);

  expect(screen.getByRole("list")).toBeInTheDocument();

  expect(screen.queryByRole("list")).toBeInTheDocument();

  expect(await screen.findByRole("list")).toBeInTheDocument();
});

test("getBy, queryBy, findBy when finding > 1 elements", async () => {
  render(<ColorList />);

  // getBy, queryBy, findBy will throw error when they find elements more than 1

  expect(() => screen.getByRole("listitem")).toThrow();

  expect(() => screen.queryByRole("listitem")).toThrow();

  let errorThrown = false;

  try {
    await screen.findByRole("listitem");
  } catch (err) {
    errorThrown = true;
  }

  expect(errorThrown).toEqual(true);
});

test("getAllBy, queryAllBy, findAllBy", async () => {
  render(<ColorList />);

  expect(screen.getAllByRole("listitem")).toHaveLength(3);

  expect(screen.queryAllByRole("listitem")).toHaveLength(3);

  expect(await screen.findAllByRole("listitem")).toHaveLength(3);
});

test("favor using getBy to prove an element exists", () => {
  render(<ColorList />);

  const element = screen.getByRole("list");

  expect(element).toBeInTheDocument();
});

test("favor using queryBy when providing an element does not exist", () => {
  render(<ColorList />);

  const element = screen.queryByRole("textbox");

  expect(element).not.toBeInTheDocument();
});

test("favor findBy or findAllBy when data fetching", async () => {
  render(<LoadableColorList />);

  const els = await screen.findAllByRole("listitem");

  expect(els).toHaveLength(3);
});
