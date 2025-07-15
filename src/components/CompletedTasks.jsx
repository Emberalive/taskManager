import Data from "./Data.jsx";

export default function CompletedTasks(props) {
    const taskElements = props.tasks.map((task) => {
        return(
            <section className="task" key={task.id}>
                <header className="task-header">
                    <h2 className="task-title">{task.title}</h2>
                </header>
                <Data  task={task} />
            </section>
        )
    })

    return (
        <>
            {taskElements.length === 0 &&
                    <div className="warning">
                        <h2>
                        You have no completed tasks
                        </h2>
                    </div>
            }
            {taskElements}
        </>
    )
}