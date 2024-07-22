import classNames from "classnames";
import React from "react";
import { useForm } from "react-hook-form";
import openEye from "../../assets/img/open-eye.png";
import closeEye from "../../assets/img/close-eye.png";
import userImg from "../../assets/img/user.png";
import { useAppDispatch } from "../../store/PostsSlice";
import { fetchLogin, fetchRegister } from "../../store/AuthSlice";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../Selectors/selectors";

const Registration: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { err } = useSelector(selectAuth);
  const { isAuth } = useSelector(selectAuth)
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
      fullName: "",
    },

  });
  const values = getValues();
  const clPassword = classNames("button", {
    "inp-password": !errors.password,
    "inp-password-error": errors.password && values.password !== "",
  });
  const clEmail = classNames("button", {
    "inp-password": !errors.email,
    "inp-password-error": errors.email && values.email !== "",
  });
  const clName = classNames("button", {
    "inp-password": !errors.fullName,
    "inp-password-error": errors.fullName && values.fullName !== "",
  });
  const [changeEye, setChangeEye] = React.useState<boolean>(false);
  const user = useSelector(selectAuth).user
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
        const d = await appDispatch(fetchRegister(data));
        console.log(d)
      })}
    >
      <div className="login-form">
        <h2>Создание аккаунта</h2>
        <img className="login-form-user-img" src={userImg} alt="user" />
        <input
          placeholder="Полное имя"
          className={clName}
          {...register("fullName", {
            required: true,
            minLength: 2,
            pattern: {
              value: /^[A-Za-zА-Яа-я]+$/,
              message: "The name can only contain letters",
            },
          })}
        />
        {errors.fullName?.message === "" && values.fullName !== "" ? (
          <span className="error-password-text">
            Поле имя должно быть больше 2 символов
          </span>
        ) : errors.fullName?.message ? (
          <span className="error-password-text">
            В поле могут быть только буквы
          </span>
        ) : (
          ""
        )}
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
        {errors.email && values.email !== "" && (
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
        {errors.password && values.password !== "" && (
          <span className="error-password-text">
            Пароль должен быть больше 5 символов
          </span>
        )}
        {err && (
          <span className="error-password-text">
            Не удалось зарегистрироваться
          </span>
        )}
        <input value={'Зарегистрироваться'} className="login-form-btn" type="submit" />
      </div>
    </form>
  );
};

export default Registration;
