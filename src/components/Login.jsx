import { useState } from "react";

export default function Login (props) {
    const [isRegistering, setIsRegistering] = useState(false);

    function clickRegister() {
        setIsRegistering(prev => !prev);
    }

    async function handleLogin (event) {
        console.log("handle login called")
        event.preventDefault()
        let resData = null
        const formData = event.target;

        const password = formData.password.value;
        const username = formData.user.value;
        await login(username, password);
    }

    async function login (username, password) {
        console.log("login called")
        let resData = {}
        if (username && password) {
            console.log("sending login request")
            await fetch(`http://localhost:7000/login?
            &username=${encodeURIComponent(username)}
            &password=${encodeURIComponent(password)}`, {method: 'GET'})
                .then(res => res.json())
                .then(data => {resData = data})
                .catch(err => console.log("This is an error: \n" + err));
        }

        if (resData) {
            console.log("using login data")
            props.setLoggedIn(resData.loggedIn);
            props.setUser(resData.user);
        }
    }

    async function handleRegister (event) {
        console.log("register function called")
        event.preventDefault()
        const formData = event.target;
        const password = formData.password.value;
        const username = formData.user.value;
        const confirmPassword = formData.confirm.value;

        if (username && password && confirmPassword) {
            const response = await fetch(`http://localhost:7000/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword,
                })
            })
            const data = await response.json()
            if (data.registered) {
                await login(username, password)
            }
        }
    }

    return(
        <section className="Login_page">
            <div className="Login_page__container">
                <h1>{isRegistering ? "Please register" : "Please Login"}</h1>
                <form className="Login_page__form" onSubmit={isRegistering ? handleRegister : handleLogin}>
                    <input type="text" placeholder="Username" name="user" />
                    <input type="password" placeholder="Password" name="password" />
                    {isRegistering && <input type="password" placeholder="Confirm Password" name="confirm"/>}
                    <div className="login_page__links">
                        <a onClick={clickRegister} href="#">{isRegistering? "Login": "Register"}</a>
                    </div>
                    <button type="submit" className="Login_page__submit">Login</button>
                </form>

            </div>
        </section>
    )
}