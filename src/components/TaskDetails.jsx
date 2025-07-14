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
            props.deleteTask(id); // actually remove it
        }, 400); // match your CSS transition duration
    };

    function handleSave (id) {
        props.setTasks(prev =>
        prev.map(task =>
            task.id === id
            ? { ...task, title: editTitle ? editTitle : task.title, description: editDescription ? editDescription : task.description }
                : task
        ))
        setIsEditingID(null);
    }

    const taskElements = props.tasks.map((task) => {
        const isRemoving = removingTaskIds.includes(task.id);
        const isCompleted = props.completedTasks.includes(task);
       return(
           <section className={((isRemoving || isCompleted) ? "removing" : "task")}>
                <header className="task-header">
                    {isEditingID === task.id ?
                        <textarea
                        onChange={(e) => setEditTitle(e.target.value)}
                        >{task.title}</textarea> :
                        <h2 className="task-title">{task.title}</h2>
                    }
                </header>
                <Data  task={task}
                       isEditingID={isEditingID}
                       setEditDescription={setEditDescription}
                       editDescription={editDescription}
                />
                <Controls
                    taskId={task.id}
                    handleDelete={handleDelete}
                    AddCompletedTasks={props.AddCompletedTasks}
                    setEditID={setIsEditingID}
                    handleSave={handleSave}
                    isEditingID={isEditingID}
                />
            </section>
       )
    })

    return (
        <>
            <AddTask setTasks={props.setTasks} tasks={props.tasks} />
            {taskElements}
        </>
    )
}