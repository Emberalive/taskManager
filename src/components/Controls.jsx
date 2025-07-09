export default function Controls(props) {
    return (
        <section className="controls">
            <a className="delete" onClick={() => props.handleDelete(props.taskId)}>
                Delete
            </a>
            <a className="complete" onClick={() => props.AddCompletedTasks(props.taskId)}>
                Complete
            </a>
            <a className="edit">
                Edit
            </a>
        </section>
    )
}