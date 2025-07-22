export default function Controls(props) {

    async function deleteTask(id) {
        console.log("deleting task: " + id)
        let resData = {}
        resData = fetch(`http://localhost:7000/deleteTask?id=${encodeURIComponent(id)}`, {
            method: "DELETE",
        })
            .then(data => {resData = data;})
            .catch(error => {console.log(error)})


        if (resData.success) {
            props.handleDelete(id)
        } else {
            props.setDeleteFailed(true)
            setTimeout(() => {
                props.setDeleteFailed(false)
            }, 3000)
            console.log(id + " deletion status: \n" + resData);
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
                }    : () => props.setEditID(props.taskId)
            }>
                {props.isEditingID === props.taskId ? "Save" :
                "Edit"}
            </button>
        </section>
    )
}