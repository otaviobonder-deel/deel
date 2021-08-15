import React, { PureComponent } from "react";
import {
  ClassAutocomplete,
  FunctionalAutocomplete,
} from "../../components/Autocomplete";
import fetchUser from "../../services/fetchUser";
import "./styles.css";

class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      classSelected: "",
      functionSelected: "",
    };
  }

  handleClassComponent = (item) => {
    this.setState({
      ...this.state,
      classSelected: item,
    });
  };

  handleFunctionalComponent = (item) => {
    this.setState({
      ...this.state,
      functionSelected: item,
    });
  };

  render() {
    const {
      state: { classSelected, functionSelected },
    } = this;

    return (
      <div className="container">
        <h1 align="center">This page shows the components working</h1>
        <div className="inner-container">
          <div>
            <p>This is a class component</p>
            <ClassAutocomplete
              fetchFn={fetchUser}
              onSelect={this.handleClassComponent}
            />
            {classSelected && <p>Selected user: {classSelected}</p>}
          </div>
          <div>
            <p>This is a functional component</p>
            <FunctionalAutocomplete
              fetchFn={fetchUser}
              onSelect={this.handleFunctionalComponent}
              notFound="Not found can be passed as props"
            />
            {functionSelected && <p>Selected user: {functionSelected}</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default Example;
