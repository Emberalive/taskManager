export default function Controls(props) {

    async function deleteTask(id) {
        console.log("deleting task: " + id)
        let resData = {}

        const response = await fetch(`http://localhost:7000/deleteTask?id=${encodeURIComponent(id)}`, {
            method: "DELETE",
        })

        resData = await response.json()

        if (response.ok) {
            props.handleDelete(id)
            return resData.success
        } else {
            props.setDeleteFailed(true)
            setTimeout(() => {
                props.setDeleteFailed(false)
            }, 3000)

            if (response.status === 500) {
                console.log("server error occurred")
            } else {
                console.log("incorrect parameters used to delete task")
            }
            return resData.success
        }
    }


    return (
        <section className="controls">
            <button className="delete" onClick={async () => await deleteTask(props.taskId)}>
                Delete
            </button>
            <button className="complete" onClick={() => props.AddCompletedTasks(props.taskId)}>
                Complete
            </button>
            <button className="edit" onClick = {props.isEditingID === props.taskId ?
                () => {
                    props.handleSave(props.taskId)
                }    : () => props.setEditData()
            }>
                {props.isEditingID === props.taskId ? "Save" :
                "Edit"}
            </button>
        </section>
    )
}