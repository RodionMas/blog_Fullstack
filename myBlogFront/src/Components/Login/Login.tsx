import React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import openEye from "../../assets/img/open-eye.png";
import closeEye from "../../assets/img/close-eye.png";
import { authChange, fetchLogin } from "../../store/AuthSlice";
import { useAppDispatch } from "../../store/PostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../Selectors/selectors";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const appDispatch = useAppDispatch()
  const { isAuth } = useSelector(selectAuth)
  const user = useSelector(selectAuth).user
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const values = getValues()
  const clPassword = classNames("button", {
    "inp-password": !errors.password,
    "inp-password-error": errors.password && values.password !== '',
  });
  const clEmail = classNames("button", {
    "inp-password": !errors.email,
    "inp-password-error": errors.email && values.email !== '',
  });
  const [changeEye, setChangeEye] = React.useState(false);
  React.useEffect(() => {
    const json = JSON.stringify(user)
    localStorage.setItem('user', json)
  }, [user])
  if (isAuth) {
    return <Navigate to={`/new`} />
  }
  return (
    <form
      onSubmit={handleSubmit( async (data) => {
        appDispatch(fetchLogin(data))
      })}
    >
      <div className="login-form">
        <input
          placeholder="E-mail"
          className={clEmail}
          {...register("email", {
            required: true,
            minLength: 1,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        {errors.email && values.email !== '' && (
          <span className="error-password-text">Введите E-mail</span>
        )}
        <div className="password-block">
          <input
            placeholder="Пароль"
            type={!changeEye ? `password` : "text"}
            className={clPassword}
            {...register("password", { required: true, minLength: 5 })}
          />
          {!changeEye ? (
            <img
              onClick={() => setChangeEye(!changeEye)}
              className="close-eye"
              src={closeEye}
              alt="Close eye"
            />
          ) : (
            <img
              onClick={() => setChangeEye(!changeEye)}
              className="close-eye"
              src={openEye}
              alt="Close eye"
            />
          )}
        </div>
        {errors.password && values.password !== '' && (
          <span className="error-password-text">
            Пароль должен быть больше 5 символов
          </span>
        )}
        <input value={`Войти`} className="login-form-btn" type="submit" />
      </div>
    </form>
  );
};

export default Login;
