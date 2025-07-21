export default function Login (props) {

    async function handleLogin (event) {
        event.preventDefault()
        let resData = null
        const formData = event.target;

        const password = formData.password.value;
        const username = formData.username.value;

        if (username && password) {
            console.log("sending login request")
            await fetch(`http://localhost:7000/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {method: 'GET'})
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

    return(
        <section className="Login_page">
            <div className="Login_page__container">
                <h1>Please Login</h1>
                <form className="Login_page__form" onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" name="username" />
                    <input type="password" placeholder="Password" name="password" />
                    <div className="login_page__links">
                        <a href="#">register</a>
                    </div>
                    <button type="submit" className="Login_page__submit">Login</button>
                </form>

            </div>
        </section>
    )
}