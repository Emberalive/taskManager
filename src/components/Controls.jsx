export default function Controls(props) {

    async function deleteTask(task) {
        console.log("deleting task: " + task.id)
        let resData = {}

        try {
            const response = await fetch(`${props.api}/tasks?id=${encodeURIComponent(task.id)}`, {
                method: "DELETE",
            })

            resData = await response.json()

            if (response.ok) {
                if (task.completed) {
                    setTimeout(() => {
                        props.setCompletedTasks(prev => {
                            return prev.filter((t) => t.id !== task.id);
                        })
                    }, 400)
                }
                props.handleDelete(task.id)
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
        console.log("[ Controls - setCompletedTask ] starting function")

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
                console.log("[ Controls - setCompletedTask ] attempting to add animation")

                props.setCompletingTasks(prev => {
                    return [...prev, updatedTask.id]
                })

                props.setCompletedTasks(prev => {
                    return [...prev, updatedTask]
                })

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
            {(props.activeView === "tasks" || props.activeView === "groups") &&
            <>
                <button className={props.taskError[props.task.id] ? "complete disabled-button" : "complete"}
                         onClick={async () => {
                             await setCompletedTask(props.task)
                         }}>
                    Complete
                </button>
                    <button className={props.taskError[props.task.id] ? "edit disabled-button" : "edit"}
                onClick={props.isEditingID === props.task.id ?
                    () => {
                        props.handleSave(props.task)
                    } : () => props.setEditData()
                }>
                {props.isEditingID === props.task.id ? "Save" :
                    "Edit"}
                </button>
            </>
}
            <button className={props.taskError[props.task.id] ? "delete disabled-button" : "delete"} onClick={async () => await deleteTask(props.task)}>
                Delete
            </button>
        </section>
    )
}