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
    // function addGroup () {
    //     console.log("group has been added");
    //     props.setAddingGroup(prev => !prev);
    // }

    // async function handleGroupDelete (group) {
    //     console.log("delete group clicked for group: " + group);
    //     let resData = null
    //
    //     console.log(group)
    //     try {
    //         const response = await fetch(`${props.api}/groups?group=${encodeURIComponent(group)}&username=${encodeURIComponent(props.user.username)}`, {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //
    //
    //         if (response.ok) {
    //             resData = await response.json();
    //             if (resData.success === false) {
    //                 console.log("could not delete group: \n" + JSON.stringify(resData));
    //             } else {
    //                 console.log("successfully deleted group: \n" + JSON.stringify(resData));
    //                 props.handleVisualError("Could not delete group");
    //                 props.setGroupClicked("");
    //                 props.setGroups(prev => {
    //                     return prev.filter((groupData) => {
    //                         return groupData.name !== group;
    //                     })
    //                 });
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error when deleting group: " + props.groupClicked + "\nError: " + error.message);
    //     }
    // }

    return (
        <div  className="header">
            <header className="title-header">
                <h1>
                    {getTitle(props.activeView)}
                </h1>
            </header>

            <nav className={"nav-items"}>
                <>
                    {/*{props.activeView === "groups" &&*/}
                    {/*    <div className={"group-controls"}>*/}
                    {/*        {props.activeView === "groups" && <a className={"addGroup"} onClick={() => {*/}
                    {/*            addGroup()*/}
                    {/*        }}>Add Group</a>}*/}
                    {/*        {(props.activeView === 'groups' && props.groupClicked) &&*/}
                    {/*            <a className={"deleteGroup"} onClick={async () => {*/}
                    {/*                const groupData = props.groups.filter(group => {*/}
                    {/*                    return group.name === props.groupClicked*/}
                    {/*                })*/}
                    {/*                if (groupData[0].tasks.length !== 0) {*/}
                    {/*                    console.log("cant delete tasks assigned to group");*/}
                    {/*                } else {*/}
                    {/*                    await handleGroupDelete(props.groupClicked)*/}
                    {/*                }*/}
                    {/*            }}>Delete Group</a>}*/}
                    {/*    </div>}*/}
                    {props.loggedIn === false && <a className="nav-item" onClick={() => {
                        if (props.activeView === "login") {
                            props.toggleView("aboutUs")
                        } else {
                            props.toggleView("login")
                            // props.toggle()
                        }
                    }}>
                        {props.activeView === "aboutUs" ? "Login / Register" : "About Sparkr"}
                    </a>}
                    {props.loggedIn &&
                        <>
                        <a className={getNavItemClass("profile")} onClick={() => {
                        props.toggleView("profile")
                        // props.toggle()
                        }}>
                            My Profile
                        </a>
                        <a className={getNavItemClass("tasks")} onClick={() => {
                            props.toggleView("tasks")
                            // props.toggle()
                        }}>
                            My Tasks
                        </a>
                        <a className={getNavItemClass("completed")} onClick={() => {
                            props.toggleView("completed")
                            // props.toggle()
                        }}>
                            Completed tasks
                        </a>
                        <a className={`nav-item__end ${getNavItemClass("groups")}`} onClick={() => {
                            props.toggleView("groups")
                            // props.toggle()
                        }}>
                            Groups
                        </a>
                    </>}
                </>
            </nav>
        </div>
    )
}