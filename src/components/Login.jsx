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
            props.handleGlobalError("username AND password is required")
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
                    props.handleGlobalError("Incorrect username or password");
                    console.log("invalid parameters for login")
                    //show something on the ui, to indicate that a user as not found
                    return
                } else if (response.status === 500) {
                    props.handleGlobalError("There is an issue with the server, sorry");
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
                    await getGroups(resData.user.username);
                    props.setLoggedIn(resData.loggedIn);
                }
            }
        } catch (err){
            props.handleGlobalError("There is an issue with the server, sorry");
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
            } else {
                props.handleGlobalError("Your tasks have not been loaded...");
            }
            resData = await response.json();


            if (resData.success !== false) {
                console.log(resData);
                props.setTasks(resData.tasks);
            } else {
                props.handleGlobalError("Your tasks have not been loaded...");
            }
        } catch (err) {
            props.handleGlobalError("There is an issue with the server, sorry");
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
            } else {
                props.handleGlobalError("Your tasks have not been loaded...");
            }
            resData = await response.json();


            if (resData.success !== false) {
                console.log(resData);
                props.setCompletedTasks(resData.tasks);
            } else {
                props.handleGlobalError("Your tasks have not been loaded...");
            }
        } catch (err) {
            props.handleGlobalError("There is an issue with the server, sorry");
            console.log("getting completed tasks for user -> Error: " + err.message);
        }
    }

    async function getGroups (username) {
        console.log("getting groups for :" + username);
        let resData = {}
        try {
            const response = await fetch(`http://localhost:7000/getGroups?username=${encodeURIComponent(username)}`,
                {
                    method: 'GET'
                })
            if (!response.ok) {
                console.log("getGroups failed to access api")
            } else {
                props.handleGlobalError("Your groups have not been loaded...");
            }
            resData = await response.json();
            if (resData.success !== false) {
                console.log(resData);
                props.setGroups(resData.groups.map((group) => {
                    return (
                        {
                            name: group.name,
                            tasks: []
                        }
                    )
                }));
            } else {
                props.handleGlobalError("Your groups have not been loaded...");
            }
        }catch (err) {
            props.handleGlobalError("There is an issue with the server, sorry");
            console.log("getting groups for user -> Error: " + err.message);
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
                    props.handleGlobalError("You need to enter a username and password");
                    console.log("incorrect parameters for register")
                    //show something on the ui that indicates incorrect parameters
                    return
                } else if (response.status === 500) {
                    props.handleGlobalError("There is an issue with the server, sorry");
                    console.log("server error occurred")
                    //show something on the ui that indicates server error
                    return;
                }

                const data = await response.json()
                if (data.registered) {
                    await login(username, password)
                } else {
                    props.handleGlobalError("There is an issue with the server, sorry");
                }
            } else {
                props.handleGlobalError("You need to enter a username and password's");
            }
        } catch (err) {
            props.handleGlobalError("There is an issue with the server, sorry");
            console.log("error registering user: " + err.message);
        }
    }


    return(
        <section className="Login_page">
            <div className="Login_page__container">
                <p>{isRegistering ? "Please register" : "Please Login"}</p>
                <form className="Login_page__form" onSubmit={isRegistering ? handleRegister : handleLogin}>
                    <label form="username">Username</label>
                        <input type="text" placeholder="Enter a username" name="user" />
                    <label form="password">Password</label>
                        <input type="password" placeholder="Enter a password" name="password" />
                    {isRegistering &&
                        <>
                            <label form={"confirmPassword"}>Confirm Password</label>
                            <input type="password" placeholder="Confirm your Password" name="confirm"/>
                        </>}
                    <button type="submit" className="Login_page__submit">Login</button>
                    <div className="login_page__links">
                        <div className={"login_page__links_container"}>
                            <p>Don't have an account? </p>
                            <a onClick={clickRegister} href="#">{isRegistering? "Login": "Register"}</a>
                        </div>
                    </div>
                </form>

            </div>
        </section>
    )
}