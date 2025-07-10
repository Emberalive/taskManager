export default function Header (props) {
    return (
        <header className="title-header">
            <h1>{props.activeView === "completed" ? "Completed Tasks": "My Tasks"}</h1>
            <a className="profile-img" onClick={props.toggle}>
                <img src="../../public/assets/profile-user.png" alt="User profile icon"/>
            </a>
        </header>
    )
}