export default function NewTaskForm(props) {
    return (
        <form className="newTaskForm" onSubmit={props.handleOnSubmit}>
            <h3>New Task</h3>

            <input type="text" className="newTaskForm__input" placeholder="Title" name="title" autoFocus={true}/>

            <textarea className="newTaskForm__input" placeholder="Description" name="description" />
            <div className="newTaskForm__buttonContainer">
                <button type={"button"} className="cancel" onClick={() => props.handleNewTask()}>Cancel</button>
                <button type="submit" className="newTaskForm__button">Create</button>
            </div>
            {props.failTask && <p>make sure to fill in both description and title</p>}
        </form>
    )
}