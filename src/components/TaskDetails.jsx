import Data from "./Data.jsx";
import Controls from "./Controls.jsx";
import {useState} from "react";
import AddTask from "./AddTask.jsx";

export default function TaskDetails(props) {

    const [removingTaskIds, setRemovingTaskIds] = useState([]);

    const handleDelete = (id) => {
        console.log(id + " deleting");
        setRemovingTaskIds(prev => [...prev, id]);
        setTimeout(() => {
            props.deleteTask(id); // actually remove it
        }, 400); // match your CSS transition duration
    };

    const taskElements = props.tasks.map((task) => {
        const isRemoving = removingTaskIds.includes(task.id);
        const isCompleted = props.completedTasks.includes(task);
       return(
           <section className={((isRemoving || isCompleted) ? "removing" : "task")}>
                <header className="task-header">
                    <h2 className="task-title">{task.title}</h2>
                </header>
                <Data  date={task.date} details={task.details} />
                <Controls taskId={task.id} handleDelete={handleDelete} AddCompletedTasks={props.AddCompletedTasks} />
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