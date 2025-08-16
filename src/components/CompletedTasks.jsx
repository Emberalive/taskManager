import Data from "./Data.jsx";

export default function CompletedTasks(props) {
    const taskElements = props.tasks.map((task) => {
        return(
            <section className="task" key={task.id}>
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
            <div>
                {taskElements}
            </div>
        </>
    )
}