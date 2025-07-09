import Data from "./Data.jsx";
import Controls from "./Controls.jsx";

export default function CompletedTasks(props) {
    const taskElements = props.tasks.map((task) => {
        return(
            <section className="task">
                <header className="task-header">
                    <h2 className="task-title">{task.title}</h2>
                </header>
                <Data  date={task.date} details={task.details} />
            </section>
        )
    })

    return (
        <>
            <h1>Completed Tasks</h1>
            {taskElements}
        </>
    )
}