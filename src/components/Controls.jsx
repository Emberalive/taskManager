export default function Controls(props) {
    return (
        <section className="controls">
            <button className="delete" onClick={() => props.handleDelete(props.taskId)}>
                Delete
            </button>
            <button className="complete" onClick={() => props.AddCompletedTasks(props.taskId)}>
                Complete
            </button>
            <button className="edit">
                Edit
            </button>
        </section>
    )
}