import {useState} from "react";
import TaskDetails from "./TaskDetails.jsx";

export default function Groups (props) {
    const [groupClicked, setGroupClicked] = useState("");

    const group = props.groups.find((group) => group.name === groupClicked);
    const tasks = group ? group.tasks : [];


    console.log(tasks);

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
            <div className="group-button" ref = {props.groups[len - 1] === group ? props.newGroup : null} onClick={() => {
                setGroupClicked(group.name);
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
            {groupClicked !== "" && <TaskDetails tasks={tasks}
                          deleteTask={props.deleteTask}
                          AddCompletedTasks={props.AddCompletedTasks}
                          completedTasks={props.completedTasks}
                          setTasks={props.setTasks}
                          user={props.user}
            />}
        </>
    )
}