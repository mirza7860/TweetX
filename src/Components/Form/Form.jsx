import { useState } from "react";
import "./Form.css";

const Form = ({ onSubmit, fields = ["email", "password", "name"] }) => {
  const initialState = {};
  fields.forEach((field) => {
    initialState[field] = "";
  });

  const [formState, setFormState] = useState({
    ...initialState,
    errors: {},
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    fields.forEach((field) => {
      if (!formState[field]) {
        errors[field] = `*${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      } else if (
        field === "email" &&
        formState &&
        formState.email &&
        !isValidEmail(formState.email)
      ) {
        errors[field] = "Invalid email format";
      }
    });
    if (Object.keys(errors).length === 0) {
      // check error
      onSubmit(formState)
        .then(() => {
          setFormState(initialState);
          console.log("Form submitted successfully!");
        })
        .catch((error) => {
          console.error("Form submission error:", error);
        });
    } else {
      setFormState((prevState) => ({
        ...prevState,
        errors,
      }));
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field} className="form-group">
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formState[field]}
              onChange={handleInputChange}
              className={`
                form-control ${
                  formState.errors && formState.errors[field]
                    ? "is-invalid"
                    : ""
                }
              `}
            />
            {formState.errors && formState.errors[field] && (
              <div className="invalid-feedback">{formState.errors[field]}</div>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
export default Form;
