import "../header.css"

export default function Header (props) {
    function getNavItemClass (view) {
        return `nav-item ${props.activeView === view ? "disabled-button" : ""}`
    }

    function getTitle (activeView) {
        switch (activeView) {
            case 'tasks':
                return "My Tasks";
            case 'completed':
                return "Completed Tasks";
            case 'profile':
                return "Profile";
            case 'groups':
                return "My Groups";
            case 'login':
                return "Welcome to Sparkr - Task Manager";
            case 'aboutUs':
                return "About Sparkr";
            default:
                return "My Tasks";
        }
    }

    return (
        <div  className="header">
            <header className="title-header">
                {props.viewPort > 400 ? <h1>
                    {getTitle(props.activeView)}
                </h1> :
                <h2>
                    {getTitle(props.activeView)}
                </h2>}
            </header>

            <nav className={"nav-items"}>
                <>
                    {props.loggedIn === false && <a className="nav-item" onClick={() => {
                        if (props.activeView === "login") {
                            props.toggleView("aboutUs")
                        } else {
                            props.toggleView("login")
                        }
                    }}>
                        {props.activeView === "aboutUs" ? "Login / Register" : "About Sparkr"}
                    </a>}
                    {props.loggedIn &&
                        <>
                        <a className={getNavItemClass("profile")} onClick={() => {
                        props.toggleView("profile")
                        }}>
                            My Profile
                        </a>
                        <a className={getNavItemClass("tasks")} onClick={() => {
                            props.toggleView("tasks")
                        }}>
                            My Tasks
                        </a>
                        <a className={getNavItemClass("completed")} onClick={() => {
                            props.toggleView("completed")
                        }}>
                            Completed tasks
                        </a>
                        <a className={`nav-item__end ${getNavItemClass("groups")}`} onClick={() => {
                            props.toggleView("groups")
                        }}>
                            Groups
                        </a>
                    </>}
                </>
            </nav>
        </div>
    )
}