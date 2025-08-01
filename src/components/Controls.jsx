export default function Controls(props) {

    async function deleteTask(id) {
        console.log("deleting task: " + id)
        let resData = {}

        try {
            const response = await fetch(`http://localhost:7000/deleteTask?id=${encodeURIComponent(id)}`, {
                method: "DELETE",
            })

            resData = await response.json()

            if (response.ok) {
                props.handleDelete(id)
                return resData.success
            } else {
                props.handleVisualError("could not delete task", props.task.id)

                if (response.status === 500) {
                    props.handleVisualError("could not delete task")
                    console.log("server error occurred")
                } else {
                    props.handleVisualError("could not delete task")
                    console.log("incorrect parameters used to delete task")
                    return resData.success
                }
                return resData.success
            }
        } catch (err) {
            props.handleVisualError("could not delete task", props.task.id)
            console.log("Error deleting task: " + err)
        }
    }

    async function addCompletedTask(task) {
        if (!task) {
            console.log("task does not exist, cannot add to completed")
            return
        }
        try {
            const result = await fetch(`http://localhost:7000/completedTask`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({task})
            })
            if (result.ok) {
                props.AddCompletedTasks(props.task.id)
                const deleted = await deleteTask(task.id)
                if (deleted) {
                    console.log("task removed from the normal task table")
                }
                console.log("completed task: " + result)
            } else {
                if (result.status === 400) {
                    props.handleVisualError("could not assign task as completed", props.task.id)
                    console.log("could not save to completed -> " + task + ", incorrect parameters")
                } else {
                    props.handleVisualError("could not assign task as completed", props.task.id)
                    console.log("Server error occurred")
                }
            }
        } catch (err) {
            console.log("error adding task to completed tasks: " + err.message)
            props.handleVisualError("could not assign task as completed", props.task.id)
        }
    }


    return (
        <section className="controls">
            <button className={props.taskError[props.task.id] ? "complete disabled-button" : "complete"} onClick={() => addCompletedTask(props.task)}>
                Complete
            </button>
            <button className={props.taskError[props.task.id] ? "edit disabled-button" : "edit"}  onClick = {props.isEditingID === props.task.id ?
                () => {
                    props.handleSave(props.task.id, props.task.groups)
                }    : () => props.setEditData()
            }>
                {props.isEditingID === props.task.id ? "Save" :
                    "Edit"}
            </button>
            <button className={props.taskError[props.task.id] ? "delete disabled-button" : "delete"} onClick={async () => await deleteTask(props.task.id)}>
                Delete
            </button>
        </section>
    )
}