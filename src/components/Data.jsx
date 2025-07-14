export default function Data (props) {
    const task = props.task;
    return (
        <div className="data-container">
            <p className="date">{task.date}</p>
            <h3 >Details</h3>
            {props.isEditingID === task.id ?
                <textarea
                    onChange={(e) => props.setEditDescription(e.target.value)}>{task.details}</textarea> :
                <p>{task.details}</p>
            }
        </div>
    )
}