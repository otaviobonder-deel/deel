import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClassAutocomplete from "./ClassAutocomplete";
import fetchUser from "../../services/fetchUser";
import FunctionalAutocomplete from "./FunctionalAutocomplete";

afterEach(cleanup);

describe("<ClassAutocomplete>", () => {
  it("should render the component correctly", () => {
    render(<ClassAutocomplete fetchFn={fetchUser} />);

    expect(
      screen.getByPlaceholderText(/Type to show suggestions/)
    ).toBeInTheDocument();
  });

  it("should call the fetch API with Otavio", async () => {
    render(<ClassAutocomplete fetchFn={fetchUser} />);

    userEvent.type(
      screen.getByPlaceholderText(/Type to show suggestions/),
      "Otavio"
    );

    expect(await screen.findByText("Otavio")).toBeInTheDocument();
  });

  it("should render an empty list", async () => {
    render(<ClassAutocomplete fetchFn={fetchUser} notFound="No users found" />);

    userEvent.type(
      screen.getByPlaceholderText(/Type to show suggestions/),
      "Empty"
    );

    expect(await screen.findByText("No users found")).toBeInTheDocument();
  });

  it("should call the onSelect function", async () => {
    const onSelect = jest.fn();

    render(<ClassAutocomplete fetchFn={fetchUser} onSelect={onSelect} />);

    userEvent.type(
      screen.getByPlaceholderText(/Type to show suggestions/),
      "Otavio"
    );

    fireEvent.click(await screen.findByRole("listitem"));

    expect(onSelect).toHaveBeenCalled();
  });
});

describe("<FunctionalAutocomplete/>", () => {
  it("should render the component correctly", () => {
    render(<FunctionalAutocomplete fetchFn={fetchUser} />);

    expect(
      screen.getByPlaceholderText(/Type to show suggestions/)
    ).toBeInTheDocument();
  });

  it("should call the fetch API with Otavio", async () => {
    render(<FunctionalAutocomplete fetchFn={fetchUser} />);

    userEvent.type(
      screen.getByPlaceholderText(/Type to show suggestions/),
      "Otavio"
    );

    expect(await screen.findByText("Otavio")).toBeInTheDocument();
  });

  it("should render an empty list", async () => {
    render(
      <FunctionalAutocomplete fetchFn={fetchUser} notFound="No users found" />
    );

    userEvent.type(
      screen.getByPlaceholderText(/Type to show suggestions/),
      "Empty"
    );

    expect(await screen.findByText("No users found")).toBeInTheDocument();
  });

  it("should call the onSelect function", async () => {
    const onSelect = jest.fn();

    render(<FunctionalAutocomplete fetchFn={fetchUser} onSelect={onSelect} />);

    userEvent.type(
      screen.getByPlaceholderText(/Type to show suggestions/),
      "Otavio"
    );

    fireEvent.click(await screen.findByRole("listitem"));

    expect(onSelect).toHaveBeenCalled();
  });
});
