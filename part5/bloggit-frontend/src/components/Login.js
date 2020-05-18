import React from "react";

const Login = ({ login, username, password }) => {
    return (
        <form onSubmit={login}>
            username
            <input
                type="text"
                onChange={({ target }) => username(target.value)}
            />
            <br />
            password
            <input
                type="password"
                onChange={({ target }) => password(target.value)}
            />
            <br />
            <button type="submit">login</button>
        </form>
    );
};

export default Login;
