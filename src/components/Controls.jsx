export default function Controls(props) {
    return (
        <section className="controls">
            <button className="delete" onClick={() => props.handleDelete(props.taskId)}>
                Delete
            </button>
            <button className="complete" onClick={() => props.AddCompletedTasks(props.taskId)}>
                Complete
            </button>
            <button className="edit" onClick = {props.isEditingID === props.taskId ?
                () => {
                    props.handleSave(props.taskId)
                }    : () => props.setEditID(props.taskId)
            }>
                {props.isEditingID === props.taskId ? "Save" :
                "Edit"}
            </button>
        </section>
    )
}