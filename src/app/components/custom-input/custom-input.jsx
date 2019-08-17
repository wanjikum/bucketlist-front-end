import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  children,
  ...props
}) => {
  const { touched, errors } = form;
  const invalid =
    typeof (touched[field.name] && errors[field.name]) === "string";
  const valid = !errors[field.name] && touched[field.name];

  return (
    <FormGroup>
      <Label for={field.name}>{label}</Label>
      <Input valid={valid} invalid={invalid} {...field} {...props}>
        {children}
      </Input>
      <FormFeedback>{errors[field.name]}</FormFeedback>
    </FormGroup>
  );
};

export default CustomInputComponent;
