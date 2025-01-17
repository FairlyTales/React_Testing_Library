import React, { Fragment } from "react";
import { connect } from "react-redux";

const TestRedux = ({ counter, dispatch }) => {
  const increment = () => dispatch({ type: "INCREMENT" });
  const decrement = () => dispatch({ type: "DECREMENT" });

  return (
    <Fragment>
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </Fragment>
  );
};

export default connect((state) => ({ counter: state.count }))(TestRedux);
