import { useState, useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "VALUE_INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }

  return inputStateReducer;
};

const UseInput = (validateValue) => {
  const [inputState, dispatchInputState] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  // const valueIsValid = validateValue(enteredValue);
  const valueIsValid = validateValue(inputState.value);

  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e) => {
    // setEnteredValue(e.target.value,)

    dispatchInputState({
      type: "VALUE_INPUT",

      value: e.target.value,
    });
  };

  const inputBlurHandler = (e) => {
    // console.log("descofou");
    // setIsTouched(true);
    dispatchInputState({
      type: "BLUR",
    });
  };

  const reset = () => {
    dispatchInputState({ type: "RESET" });
    // setEnteredValue("");
    // setIsTouched(false);
  };

  return {
    // value: enteredValue,
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default UseInput;
