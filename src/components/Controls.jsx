export default function Controls(props) {
    return (
        <section className="controls">
            <a className="delete" onClick={props.deleteTask(props.taskId)}>
                Delete
            </a>
            <a className="complete">
                Complete
            </a>
            <a className="edit">
                Edit
            </a>
        </section>
    )
}