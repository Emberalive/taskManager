export default function AddGroupForm (props) {


    async function createNewGroup (username, groupName) {
        let resData = {}
        const response = await fetch(`http://localhost:7000/groups`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username: username,
                groupName: groupName,
            })
        });

        if (!response.ok) {
            console.log("Failed to create new group");
            return false
        }
        resData = await response.json();
        return resData;
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const name = e.target.name.value
        if (!name || name === "") {
            props.handleGlobalError("you need to add a group Title")
            console.log("no value for group name");
            props.setAddingGroup(false)
            return
        }
        try {
            const success = await createNewGroup(props.user.username, name)

            if (success) {
                console.log("Group successfully created")
                props.setGroups((prev) => [...prev, {
                    name: name,
                    tasks: []
                }])

                setTimeout(() => {
                    console.log(props.groups)
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
            } else {
                props.handleGlobalError("There was an issue with the server, sorry")
                console.error("could not create new group");
            }
        } catch (error) {
            props.handleGlobalError("There was an issue with the server sorry");
            console.log("Could not create group: " + error.message)
        } finally {
            props.setAddingGroup(prev => !prev)
        }
    }

    return (
        <div className="add-group__form">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Group Name" name="name" />
                <div>
                    <button onClick={() => {
                        console.log("canceling add new group")
                        props.setAddingGroup(false)
                    }} >Cancel</button>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}