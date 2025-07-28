export default function (props) {

    function handleSubmit(e) {
        e.preventDefault()
        const name = e.target.name.value
        props.setGroups((prev) => [...prev, name])
        props.setAddingGroup(prev => !prev)

        setTimeout(() => {
            if (props.groupsRef.current && props.newGroup.current) {
                props.groupsRef.current.scrollTo({
                    left: props.groupsRef.current.scrollWidth,
                });

                setTimeout(() => {
                    props.newGroup.current.style.backgroundColor = "var(--secondary)";
                }, 300)
                setTimeout(() => {
                    props.newGroup.current.style.backgroundColor = "";
                }, 700)
            }
        }, 200); // Delay so DOM updates first
    }

    return (
        <div className="add-group__form">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Group Name" name="name" />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}