import { FormEvent, useState } from "react";
import { useRegistrationMutation } from "../../store/api/AuthController";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { Form } from "../../Components/Form/Form";
import { FormField } from "../../Components/Form/FormField/FormField";
import { FormWrapper } from "../../Components/Form";

const Register = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [female, setFemale] = useState("");
  const [error, setError] = useState("");
  const [registrationTrigger, _] = useRegistrationMutation();
  const { loginUser } = useAuth();
  const [fields, setFields] = useState([
    {
      type: "text",
      onChange: (e) => setNickname(e.target.value),
      placeholder: "aKirpichenok",
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
    {
      type: "text",
      onChange: (e) => setName(e.target.value),
      placeholder: "Андрей",
      error: error,
      label: "Имя",
    },
    {
      type: "text",
      onChange: (e) => setFemale(e.target.value),
      placeholder: "Кирпиченок",
      error: error,
      label: "Фамилия",
    },
  ]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await registrationTrigger(
        JSON.stringify({ nickname, password, name, female }),
      ).unwrap();
      if (result) {
        loginUser(nickname, password);
      }
    } catch (e) {
      setError(e?.data?.message);
    }
  };
  return (
    <div style={{ padding: "100px" }}>
      <FormWrapper title={"Регистрация"}>
        <Form onSubmit={handleSubmit}>
          {fields.map(
            ({ type, onChange, placeholder, label, error, ...rest }) => (
              <FormField
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                label={label}
                error={error}
                {...rest}
              />
            ),
          )}
        </Form>
      </FormWrapper>
    </div>
  );
};

export default Register;
