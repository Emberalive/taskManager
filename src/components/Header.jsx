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
            case 'login':
                return "Welcome to Sparkr - Task Manager";
            case 'aboutUs':
                return "About Us";
            default:
                return "My Tasks";
        }
    }
    function addGroup () {
        console.log("group has been added");
        props.setAddingGroup(prev => !prev);
    }

    async function handleGroupDelete (group) {
        console.log("delete group clicked for group: " + group);
        let resData = null

        console.log(group)
        try {
            const response = await fetch("http://86.19.219.159:7000/groups", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    group: group,
                    username: props.user.username
                })
            })


            if (response.ok) {
                resData = await response.json();
                if (resData.success === false) {
                    console.log("could not delete group: \n" + JSON.stringify(resData));
                } else {
                    console.log("successfully deleted group: \n" + JSON.stringify(resData));
                    props.setGroupClicked("");
                    props.setGroups(prev => {
                        return prev.filter((groupData) => {
                            return groupData.name !== group;
                        })
                    });
                }
            }
        } catch (error) {
            console.error("Error when deleting group: " + props.groupClicked + "\nError: " + error.message);
        }
    }

    return (
        <header className="title-header">
            {props.activeView === "groups" && <a className={"addGroup"} onClick={() => {
                addGroup()
            }}>Add Group</a>}
            <h1>
                {getTitle(props.activeView)}
            </h1>
            {(props.activeView === 'groups' && props.groupClicked) && <a className={"deleteGroup"} onClick={async () => {
                const groupData = props.groups.filter(group => {
                    return group.name === props.groupClicked
                })
                if (groupData[0].tasks.length !== 0) {
                    console.log("cant delete tasks assigned to group");
                } else {
                    await handleGroupDelete(props.groupClicked)
                }
            }}>Delete Group</a>}
        </header>
    )
}