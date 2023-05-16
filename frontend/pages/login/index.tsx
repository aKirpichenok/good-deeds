import { useState } from "react";

import { useAuth } from "../../Components/AuthContext/AuthContext";
import { FormWrapper } from "../../Components/Form";
import { Form } from "../../Components/Form/Form";
import { FormField } from "../../Components/Form/FormField/FormField";
import { TipLog } from "../../Components/Form/TipLog/TipLog";

const Login = () => {
  const [loginValue, setLogin] = useState("");
  const [passwordValue, setPassword] = useState("");
  const { loginUser, error } = useAuth();
  const [fields, setFields] = useState([
    {
      type: "text",
      onChange: (e) => setLogin(e.target.value),
      placeholder: "nickname",
      error: error,
      label: "Логин",
    },
    {
      type: "password",
      onChange: (e) => setPassword(e.target.value),
      placeholder: "qwe123",
      error: error,
      eye: true,
      label: "Пароль",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(loginValue, passwordValue);
  };
  return (
    <div style={{ padding: "100px" }}>
      <FormWrapper title={"Вход"}>
        <Form onSubmit={handleSubmit}>
          {fields.map(
            ({ type, onChange, placeholder, error, label, ...rest }) => (
              <FormField
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                error={error}
                label={label}
                {...rest}
              />
            ),
          )}
        </Form>
        <TipLog />
      </FormWrapper>
    </div>
  );
};

export default Login;
