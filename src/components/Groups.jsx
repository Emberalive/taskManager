import "../groups.css"
import deleteImg from "../../public/delete.png"

import TaskDetails from "./TaskDetails.jsx";

export default function Groups (props) {

    const group = props.groups.find((group) => group.name === props.groupClicked);
    const tasks = group ? group.tasks : null;

    async function handleGroupDelete (group) {
        console.log("delete group clicked for group: " + group);
        let resData = null

        console.log(group)
        try {
            const response = await fetch(`${props.api}/groups?group=${encodeURIComponent(group)}&username=${encodeURIComponent(props.user.username)}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })


            if (response.ok) {
                resData = await response.json();
                if (resData.success === false) {
                    console.log("could not delete group: \n" + JSON.stringify(resData));
                } else {
                    console.log("successfully deleted group: \n" + JSON.stringify(resData));
                    props.handleVisualError("Could not delete group");
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

    function addGroup () {
        console.log("group has been added");
        props.setAddingGroup(prev => !prev);
    }

    //adds the ability to scroll horizontally using the scroll wheel
    const handleWheel = (e) => {
        if (props.groupsRef.current) {
            e.preventDefault()
            props.groupsRef.current.scrollLeft += e.deltaY;
        }
    }

    const groupElements = props.groups.map((group) => {
        const len = props.groups.length;
        return (
            <div id={group.name} key={group.name} className={props.groupClicked === group.name ? "group-button group-Clicked" : "group-button"} ref = {props.groups[len - 1] === group ? props.newGroup : null} onClick={() => {
                props.setGroupClicked(group.name);
            }}>
                <p>{group.name}</p>
            </div>
            )
    })
    return (
        <>
            <section className="groups-container" >
                <div  className="groups" onWheel={handleWheel} ref={props.groupsRef}>
                    {groupElements}
                </div>
                <div className={"group-controls"}>
                    <a className={"addGroup"} onClick={() => {
                        addGroup()
                    }}> Add Group
                    </a>

                    {(props.activeView === 'groups' && props.groupClicked) &&
                        <a className={"deleteGroup"} onClick={async () => {
                            const groupData = props.groups.filter(group => {
                                return group.name === props.groupClicked
                            })
                            if (groupData[0].tasks.length !== 0) {
                                console.log("cant delete tasks assigned to group");
                            } else {
                                await handleGroupDelete(props.groupClicked)
                            }
                        }}>
                            <img style={{
                                height: "30px",
                                width: "30px",
                            }}
                                src={deleteImg} alt={"remove"}></img>

                        </a>}
                </div>
            </section>
            {props.groupClicked !== "" && <TaskDetails tasks={tasks}
                          deleteTask={props.deleteTask}
                          AddCompletedTasks={props.AddCompletedTasks}
                          completedTasks={props.completedTasks}
                          setTasks={props.setTasks}
                          user={props.user}
                          groupClicked={props.groupClicked}
                          taskErrorRef={props.taskErrorRef}
                          handleVisualError={props.handleVisualError}
                          taskError={props.taskError}
                          handleGlobalError={props.handleGlobalError}
                          api={props.api}
                          activeView={props.activeView}
            />}
            {props.groupClicked && (!tasks || tasks.length ===0) && (<p style={{
                fontWeight: "bold",
                textAlign: "center"
            }}>There are no tasks to be found, please create some so that you can see them</p>
            )}
        </>
    )
}