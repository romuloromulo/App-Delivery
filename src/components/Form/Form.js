import UseInput from "../Hooks/use-input";
import classes from "./Form.module.css";
const nameValidation = (value) => value.trim() !== "";

const BasicForm = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameInputHassError,
    inputBlurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
    reset: nameReset,
  } = UseInput(nameValidation);

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameInputHassError,
    inputBlurHandler: lastNameBlurHandler,
    valueChangeHandler: lastNameChangeHandler,
    reset: lastNameReset,
  } = UseInput(nameValidation);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHassError,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    reset: emailReset,
  } = UseInput((value) => {
    return value.trim() !== "" && value.trim().includes("@");
  });
  const {
    value: enteredAdress,
    isValid: adressIsValid,
    hasError: adressInputHassError,
    inputBlurHandler: adressBlurHandler,
    valueChangeHandler: adressChangeHandler,
    reset: adressReset,
  } = UseInput((value) => {
    return value.trim() !== "" && /\d/.test(value);
  });

  const userInformation = [];

  const backEnd = async () => {
    await fetch(
      "https://realistic-example-483a6-default-rtdb.firebaseio.com/user.json",
      {
        method: "POST",
        body: JSON.stringify(userInformation),
      }
    );
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!nameIsValid || !emailIsValid || !lastNameIsValid || !adressIsValid) {
      return;
    }

    console.log(enteredName, enteredLastName, enteredEmail);

    userInformation.push({
      name: enteredName,
      lastName: enteredLastName,
      email: enteredEmail,
    });
    backEnd();
    nameReset();
    lastNameReset();
    emailReset();
    adressReset();
  };

  let formIsValid;

  if (nameIsValid && emailIsValid && lastNameIsValid) {
    formIsValid = true;
  }

  const nameInputClass = nameInputHassError
    ? `${classes["form-control"]} ${classes.invalid}`
    : `${classes["form-control"]}`;

  const emailInputClass = emailInputHassError
    ? `${classes["form-control"]} ${classes.invalid}`
    : `${classes["form-control"]}`;

  const lastNameInputClass = lastNameInputHassError
    ? `${classes["form-control"]} ${classes.invalid}`
    : `${classes["form-control"]}`;

  const adressInputClass = adressInputHassError
    ? `${classes["form-control"]} ${classes.invalid}`
    : `${classes["form-control"]}`;

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes["control-group"]}>
        <div className={nameInputClass}>
          <label htmlFor="name">First Name</label>
          <input
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
            type="text"
            id="name"
          />
          {nameInputHassError && (
            <p className={classes[`error-text`]}>
              Name input must not be empty
            </p>
          )}
        </div>
        <div className={lastNameInputClass}>
          <label htmlFor="lastname">Last Name</label>
          <input
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={enteredLastName}
            type="text"
            id="lastname"
          />
          {lastNameInputHassError && (
            <p className={classes[`error-text`]}>
              Last Name input must not be empty
            </p>
          )}
        </div>

        <div className={emailInputClass}>
          <label htmlFor="email">E-Mail Address</label>
          <input
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            type="text"
            id="email"
          />
          {emailInputHassError && (
            <p className={classes[`error-text`]}>E-mail invalid.</p>
          )}
        </div>
        <div className={adressInputClass}>
          <label htmlFor="adress" className={classes.label}>
            Adress
          </label>
          <input
            onChange={adressChangeHandler}
            onBlur={adressBlurHandler}
            value={enteredAdress}
            type="text"
            id="adress"
          />
          {adressInputHassError && (
            <p className={classes[`error-text`]}>Adress invalid.</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default BasicForm;
