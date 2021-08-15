import React, { Component } from "react";
import debounce from "../../utils/debounce";
import "./styles.css";

class ClassAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      showSuggestions: false,
      userInput: "",
      error: false,
    };
  }

  fetchApi = (search) => {
    this.props
      .fetchFn(search)
      .then((items) =>
        this.setState((prevState) => ({
          ...prevState,
          showSuggestions: true,
          suggestions: items,
          error: false,
        }))
      )
      .catch(() =>
        this.setState((prevState) => ({ ...prevState, error: true }))
      );
  };

  debouncedApiCall = debounce((search) => this.fetchApi(search), 300);

  onChange = (e) => {
    const typedValue = e.currentTarget.value;
    if (typedValue) {
      this.debouncedApiCall(typedValue);
      this.setState((prevState) => ({
        ...prevState,
        userInput: typedValue,
      }));
      return;
    }

    /*
    this will clear the suggestions, so the next time the user types,
    previous suggestions won't show. this is because of the debounce
    */

    if (!typedValue) {
      this.setState((prevState) => ({
        ...prevState,
        suggestions: [],
        showSuggestions: false,
        userInput: "",
      }));
    }
  };

  onClick = (e) => {
    const selectedValue = e.currentTarget.innerText;

    this.setState({
      suggestions: [],
      showSuggestions: false,
      userInput: selectedValue,
    });

    this.props.onSelect && this.props.onSelect(selectedValue);
  };

  renderLabel = (label) => {
    const searchString = this.state.userInput;

    if (searchString) {
      const index = label.toLowerCase().indexOf(searchString.toLowerCase());

      if (index !== -1) {
        const length = searchString.length;

        const prefix = label.substring(0, index);
        const suffix = label.substring(index + length);
        const match = label.substring(index, index + length);

        return (
          <span>
            {prefix}
            <span className="searchString">{match}</span>
            {suffix}
          </span>
        );
      }
    }

    return <span>{label}</span>;
  };

  render() {
    const {
      onChange,
      onClick,
      state: { suggestions, showSuggestions, userInput, error },
    } = this;

    let suggestionsListComponent = null;

    if (showSuggestions && userInput) {
      if (suggestions.length > 0) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {suggestions.map((suggestion) => {
              return (
                <li key={suggestion} onClick={onClick}>
                  {this.renderLabel(suggestion)}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>{this.props.notFound || "No items found"}</em>
          </div>
        );
      }
    }

    return (
      <div>
        <input
          type="text"
          onChange={onChange}
          value={userInput}
          placeholder="Type to show suggestions"
        />
        {suggestionsListComponent}
        {error && <p>Error fetching the API, probably rate exceeded</p>}
      </div>
    );
  }
}

export default ClassAutocomplete;
