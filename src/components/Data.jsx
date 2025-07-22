export default function Data (props) {
    return (
        <div className="data-container">
            <header className="data-header">
                <h2>Details</h2>
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