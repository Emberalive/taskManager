
export default function Login (props) {

    function handleLogin (event) {
        event.preventDefault()
        let isUser = null;

        const formData = event.target;

        const password = formData.password.value;
        const username = formData.username.value;
        console.log(username === props.user.name);
        console.log(password === props.user.password);
        if (username && password) {
            isUser = password === props.user.password && props.user.name === username;
            console.log(isUser);
        }

        if (isUser) {
            props.setLoggedIn(prev => !prev);
        }
    }

    return(
        <section className="Login_page">
            <div className="Login_page__container">
                <h1>Please Login</h1>
                <form className="Login_page__form" onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" name="username" />
                    <input type="password" placeholder="Password" name="password" />
                    <button type="submit" className="Login_page__submit">Login</button>
                </form>
                <div className="login_page__links">
                    <a href="#">register</a>
                </div>

            </div>
        </section>
    )
}