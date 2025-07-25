export default function Data (props) {
    return (
        <div className="data-container">
            <div>
                <header className="task-header">
                    {props.isEditingID === props.task.id ?
                        <textarea
                            onChange={(e) => {
                                props.setEditTitle(e.target.value)
                            }
                            }
                            defaultValue={props.task.title}
                        ></textarea> :
                        <h2 className="task-title">{props.task.title}</h2>
                    }
                </header>
                <section className="data">
                    <h2>Details</h2>
                    <p className="date">{props.task.date}</p>
                    {props.deleteFailed &&<h3>Task failed to delete</h3>}
                </section>
            </div>
            {props.isEditingID === props.task.id ?
                <textarea
                    onChange={(e) => {
                        props.setEditDescription(e.target.value)
                    }
                    } defaultValue={props.task.description}></textarea> :
                <p>{props.task.description}</p>
            }
        </div>
    )
}