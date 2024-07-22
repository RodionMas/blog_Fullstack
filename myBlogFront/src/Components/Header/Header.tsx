import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAuth } from "../../Selectors/selectors";
import door from '../../assets/img/open-door.png'
import { authChange } from "../../store/AuthSlice";

const Header: React.FC = () => {
    const dispatch = useDispatch()
    let { isAuth } = useSelector(selectAuth);
    const user = useSelector(selectAuth).user;
    const removeUser = () => {
        window.localStorage.removeItem('user')
        dispatch(authChange(false))
    }
    React.useEffect(() => {
        const json = JSON.stringify(user)
        localStorage.setItem('user', json)
        if (user.token) {
            dispatch(authChange(true))
        }
    }, [user])

    return (
        <header className="header">
            <div className="wrapper">
                <div className="logo">
                    <Link to={"/new"}>
                        <span className="logo-text">RodionMas</span>
                    </Link>
                </div>
                <div className="auth-block">
                    {!isAuth || !user.token ? (
                        <>
                            <Link className="login" to={"/login"}>
                                Войти
                            </Link>
                            <Link className="register" to={"/register"}>
                                Создать аккаунт
                            </Link>
                        </>
                    ) : <>
                        <span className="username-header">{`Вы: ${user.fullName}`}</span>
                        <Link to={`/create`} className="create-blog">Создать статью</Link>
                        <button onClick={() => removeUser()} className="logout-btn"><span>Выйти</span> <img className="logout-img" src={door} alt="logout" /> </button>
                    </>}
                </div>
            </div>
        </header>
    );
};

export default Header;
