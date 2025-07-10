export default function Header (props) {
    return (
        <header className="title-header">
            <h1>{props.activeView === "completed" ? "Completed Tasks": "My Tasks"}</h1>
        </header>
    )
}