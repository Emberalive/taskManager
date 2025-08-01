export default function Data (props) {
    return (
        <div className="data-container">
                <header className="task-header">
                    {props.isEditingID === props.task.id ?
                        <input type={"text"}
                            onChange={(e) => {
                                props.setEditTitle(e.target.value)
                            }
                            }
                            defaultValue={props.task.title}
                        ></input> :
                        <h2 className="task-title">{props.task.title}</h2>
                    }
                    <p className="date">{props.task.date}</p>
                </header>
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