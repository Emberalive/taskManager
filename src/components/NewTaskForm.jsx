export default function NewTaskForm(props) {
    return (
        <form className="newTaskForm" onSubmit={props.handleOnSubmit}>
            <h3>New Task</h3>

            <input type="text" className="newTaskForm__input" placeholder="Title" name="title" autoFocus={true}/>

            <input type="text" name="description" className="newTaskForm__input" placeholder="Description" />
            <div className="newTaskForm__buttonContainer">
                <button type="submit" className="newTaskForm__button">Create</button>
                <a className="cancel" onClick={() => props.handleNewTask()}>Cancel</a>
            </div>

        </form>
    )
}