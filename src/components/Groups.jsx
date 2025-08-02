import TaskDetails from "./TaskDetails.jsx";
import { nanoid } from "nanoid";

export default function Groups (props) {

    const group = props.groups.find((group) => group.name === props.groupClicked);
    const tasks = group ? group.tasks : null;


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
            <section className="groups" onWheel={handleWheel} ref={props.groupsRef}>
                {groupElements}
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
            />}
            {props.groupClicked && (!tasks || tasks.length ===0) && (<p style={{
                fontWeight: "bold",
                textAlign: "center"
            }}>There are no tasks to be found, please create some so that you can see them</p>
            )}
        </>
    )
}