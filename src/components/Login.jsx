import { useState } from "react";

export default function Login (props) {
    const [isRegistering, setIsRegistering] = useState(false);

    function clickRegister() {
        setIsRegistering(prev => !prev);
    }

    async function handleLogin (event) {
        console.log("handle login called")
        event.preventDefault()
        const formData = event.target;

        const password = formData.password.value;
        const username = formData.user.value;
        if (!username && !password) {
            console.log("username AND password is required");
            return
        }
        await login(username, password);
    }

    async function login (username, password) {
        console.log("login called")
        let resData = {}
        try {
            if (username && password) {
                console.log("sending login request")
                const response = await fetch(`http://localhost:7000/login?
            &username=${encodeURIComponent(username)}
            &password=${encodeURIComponent(password)}`, {method: 'GET'})

                if (response.ok) {
                    console.log("login request successful for user: " + username)
                } else if (response.status === 400) {
                    console.log("invalid parameters for login")
                    //show something on the ui, to indicate that a user as not found
                    return
                } else if (response.status === 500) {
                    console.log("server error occurred")
                    //show something on the ui to indicate server error
                }

                resData = await response.json();

                if (resData !== null) {
                    console.log("using login data")
                    props.setUser(resData.user);
                    console.log("Getting all of users tasks....")
                    await getTasks(resData.user.username);
                    await getCompletedTasks(resData.user.username);
                    props.setLoggedIn(resData.loggedIn);
                }
            }
        } catch (err){
            console.log("Error when accessing api: " + err.message);
        }
    }

    async function getTasks (username) {
        console.log("getting tasks for :" + username);
        let resData = {}

        try {
            if (!username) {
                console.log("failed to get tasks for user, no username");
                return
            }
            const response = await fetch(`http://localhost:7000/getUserTasks?username=${encodeURIComponent(username)}`, {
                method: 'GET'
            })

            if (!response.ok) {
                console.log("getUserTasks failed to access api")
            }
            resData = await response.json();


            if (resData.success !== false) {
                console.log(resData);
                props.setTasks(resData.tasks);
            }
        } catch (err) {
            console.log("getting tasks for user -> Error: " + err.message);
        }
    }

    async function getCompletedTasks (username) {
        console.log("getting completed tasks for :" + username);
        let resData = {}

        try {
            if (!username) {
                console.log("failed to get completed tasks for user, no username");
                return
            }
            const response = await fetch(`http://localhost:7000/getCompletedTasks?username=${encodeURIComponent(username)}`, {
                method: 'GET'
            })

            if (!response.ok) {
                console.log("getCompletedTasks failed to access api")
            }
            resData = await response.json();


            if (resData.success !== false) {
                console.log(resData);
                props.setCompletedTasks(resData.tasks);
            }
        } catch (err) {
            console.log("getting completed tasks for user -> Error: " + err.message);
        }
    }


    async function handleRegister (event) {
        console.log("register function called")
        event.preventDefault()
        const formData = event.target;
        const password = formData.password.value;
        const username = formData.user.value;
        const confirmPassword = formData.confirm.value;

        try {
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

                if (response.ok) {
                    console.log("register request successful for user: " + username)
                } else if (response.status === 400) {
                    console.log("incorrect parameters for register")
                    //show something on the ui that indicates incorrect parameters
                    return
                } else if (response.status === 500) {
                    console.log("server error occurred")
                    //show something on the ui that indicates server error
                    return;
                }

                const data = await response.json()
                if (data.registered) {
                    await login(username, password)
                }
            }
        } catch (err) {
            console.log("error registering user: " + err.message);
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