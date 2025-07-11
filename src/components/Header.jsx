export default function Header (props) {

    function getTitle (activeView) {
        switch (props.activeView) {
            case 'tasks':
                return "My Tasks";
            case 'completed':
                return "Completed Tasks";
            case 'profile':
                return "Profile";
            default:
                return "My Tasks";
        }
    }

    return (
        <header className="title-header">
            <h1>
                {getTitle(props.activeView)}
            </h1>
        </header>
    )
}