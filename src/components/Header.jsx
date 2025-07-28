export default function Header (props) {

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
            default:
                return "My Tasks";
        }
    }
    function addGroup () {
        console.log("group has been added");
        props.setAddingGroup(prev => !prev);
    }

    return (
        <header className="title-header">
            <h1>
                {getTitle(props.activeView)}
            </h1>
            {props.activeView === "groups" && <a className={"addGroup"} onClick={() => {
                addGroup()
            }}>Add Group</a>}
        </header>
    )
}