import "../about.css"

export default function AboutUs (props) {
    return (
        <div className="about-container">
            <section className="about">
                {props.viewport < 500 ?<h1>About Sparkr</h1> :
                    <h2>About Sparkr</h2>
                }

                <p>
                    Hello, I am a Software Engineer in training (in education)
                    <br/>
                    <br/>
                    This is a personal project of mine, Where you can create tasks, set a title and a description
                    <br/>
                    <br/>
                    You are also able to set tasks as completed,  this simply moves the tasks to a different
                    section of the app, so they are not visible in your active tasks.
                    <br/>
                    <br/>
                    You are also able to allocate tasks to groups so that you can have tasks specific to certain things
                    such as <strong>Home, Work, Hobbies etc...</strong>
                    <br/>
                    <br/>
                    <strong>NOTE: </strong>You are more than welcome to use this app, <strong>HOWEVER</strong> the data is
                    stored in my home server, and will not be as secure as your average application. I however will not use, manipulate
                    or access your data, as per request I will delete any data stored for a user, if given your username. passwords are
                    encrypted using <a href={"https://www.npmjs.com/package/bcrypt"}>bcrypt</a>
                </p>
            </section>
        </div>
    )
}