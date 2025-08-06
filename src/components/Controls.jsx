export default function Controls(props) {

    async function deleteTask(id) {
        console.log("deleting task: " + id)
        let resData = {}

        try {
            const response = await fetch(`https://86.19.219.159:7000/tasks?id=${encodeURIComponent(id)}`, {
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

    async function setCompletedTask(task) {

        if (!task) {
            console.log("task does not exist, cannot add to completed")
            return
        }

        const updatedValues = {
            id: task.id,
            completed: true,
        }

        const updatedTask = {
            ...task,
            completed: true
        }

        try {
            const success = await props.updateTask(updatedValues)

            if (success) {
                props.setCompletedTasks(prev => {
                    return [...prev, updatedTask]
                } )

                props.AddCompletedTasks(task.id)
            } else {
                console.log("error completing task: " + task.id)
            }
        } catch (err) {
            console.log("error adding task to completed tasks: " + err.message)
            props.handleVisualError("could not assign task as completed", props.task.id)
        }
    }

    return (
        <section className="controls">
            <button className={props.taskError[props.task.id] ? "complete disabled-button" : "complete"} onClick={async () => {
                await setCompletedTask(props.task)
            }}>
                Complete
            </button>
            <button className={props.taskError[props.task.id] ? "edit disabled-button" : "edit"}  onClick = {props.isEditingID === props.task.id ?
                () => {
                    props.handleSave(props.task)
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