import Data from "./Data.jsx";
import Controls from "./Controls.jsx";
import {useState} from "react";
import AddTask from "./AddTask.jsx";

export default function TaskDetails(props) {
    const [isEditingID, setIsEditingID] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const [removingTaskIds, setRemovingTaskIds] = useState([]);

    const handleDelete = (id) => {
        console.log(id + " deleting");
        setRemovingTaskIds(prev => [...prev, id]);
        setTimeout(() => {
            props.deleteTask(id);
        }, 400);
    };

    function clearEditing() {
        setEditTitle("");
        setEditDescription("");
        setIsEditingID(null);
    }


    async function updateTask(task) {
        try {
            const response = await fetch(`http://localhost:7000/updateTask`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(task),
                }
            );

            if (response.status === 200) {
                console.log("task was successfully updated");
                return true
            } else {
                if (response.status === 400) {
                    console.log("invalid parameters sent")
                    return false;
                } else if (response.status === 500) {
                    console.log("Server error occurred")
                    return false;
                }
            }
        } catch (err) {
            console.error("error Whilst updating task -> " + task.id + "\nError: " + err.message);
            return false;
        }
    }


    async function handleSave (id) {
        console.log("Saving task changes in state for task: " + id);

        const success = await updateTask({
            id: id,
            title: editTitle,
            description: editDescription
        });

        if (success) {
            props.setTasks(prev =>
                prev.map((task) =>
                    task.id === id ?
                        {
                            ...task, title: editTitle === "" ? task.title : editTitle,
                            description: editDescription === "" ? task.description : editDescription
                        }: task
                ))
        }else {
            props.handleVisualError("could not update task details", id);
            console.log("error Whilst updating task -> " + id);
        }
            clearEditing()
    }

    const taskElements = props.tasks.map((task) => {
        const isRemoving = removingTaskIds.includes(task.id);
        const isCompleted = props.completedTasks.includes(task);
       return(
           <div>
               <section className={((isRemoving || isCompleted) ? "removing" : "task")} key={task.id}>
                   <Data
                       setEditTitle={setEditTitle}
                       task={task}
                       isEditingID={isEditingID}
                       setEditDescription={setEditDescription}
                       editDescription={editDescription}
                   />
                   <section className={"task-error"} id={`task-error-${task.id}`}>
                       <p>{props.taskError[task.id] || "Sorry an error occurred"}</p>
                   </section>
                   <Controls
                       task={task}
                       handleDelete={handleDelete}
                       AddCompletedTasks={props.AddCompletedTasks}
                       setEditData={() => {
                           setIsEditingID(task.id);
                           setEditTitle(task.title);
                           setEditDescription(task.description);
                       }}
                       handleSave={handleSave}
                       taskError={props.taskError}
                       isEditingID={isEditingID}
                       handleVisualError={(error) => props.handleVisualError(error, task.id)}
                   />
               </section>
           </div>
       )
    })

    return (
        <>
            <AddTask setTasks={props.setTasks}
                     tasks={props.tasks}
                     user={props.user}
                     group={props.groupClicked}
            />
            {taskElements}
        </>
    )
}