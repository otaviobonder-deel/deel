import React, { useCallback, useMemo, useState } from "react";
import debounce from "../../utils/debounce";
import "./styles.css";

const SuggestionsListComponent = ({
  showSuggestions,
  userInput,
  suggestions,
  onClick,
  notFound,
}) => {
  const renderLabel = useCallback(
    (label) => {
      const searchString = userInput;

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
    },
    [userInput]
  );

  if (showSuggestions && userInput) {
    if (suggestions.length > 0) {
      return (
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return (
              <li key={suggestion} onClick={onClick}>
                {renderLabel(suggestion)}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <div className="no-suggestions">
          <em>{notFound || "No items found"}</em>
        </div>
      );
    }
  }

  return null;
};

const FunctionalAutocomplete = ({ fetchFn, onSelect, notFound }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(false);

  const fetchApi = useCallback(
    async (search) => {
      try {
        const items = await fetchFn(search);
        setShowSuggestions(true);
        setSuggestions(items);
        setError(false);
      } catch (e) {
        setError(true);
      }
    },
    [fetchFn]
  );

  const debouncedApiCall = useMemo(() => {
    return debounce((search) => fetchApi(search), 300);
  }, [fetchApi]);

  const handleChange = useCallback(
    (e) => {
      const typedValue = e.target.value;
      if (typedValue) {
        debouncedApiCall(typedValue);
        setUserInput(typedValue);
        return;
      }

      if (!typedValue) {
        setSuggestions([]);
        setShowSuggestions(false);
        setUserInput("");
      }
    },
    [debouncedApiCall]
  );

  const handleOnClick = useCallback(
    (e) => {
      const selectedValue = e.target.innerText;

      setSuggestions([]);
      setShowSuggestions(false);
      setUserInput(selectedValue);

      onSelect && onSelect(selectedValue);
    },
    [onSelect]
  );

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        value={userInput}
        placeholder="Type to show suggestions"
      />
      <SuggestionsListComponent
        suggestions={suggestions}
        notFound={notFound}
        showSuggestions={showSuggestions}
        onClick={handleOnClick}
        userInput={userInput}
      />
      {error && <p>Error fetching the API, probably rate exceeded</p>}
    </div>
  );
};

export default FunctionalAutocomplete;
