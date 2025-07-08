import Data from "./Data.jsx";
import Controls from "./Controls.jsx";

export default function TaskDetails(props) {

    const taskElements = props.tasks.map((task) => {
       return(
           <section className="task">
                <header className="task-header">
                    <h2 className="task-title">{task.title}</h2>
                </header>
                <Data  date={task.date} details={task.details} />
                <Controls deleteTask={() => props.deleteTask()} taskId={props.id} />
            </section>
       )
    })

    return (
        <>
            {taskElements}
        </>
    )
}