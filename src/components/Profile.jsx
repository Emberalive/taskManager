import {useState} from "react";

export default function Profile(props) {
    const [editProfile, setEditProfile] = useState(false);
    const [newProfile, setNewProfile] = useState({});

    function startEditProfile() {
        setNewProfile(props.user);
        setEditProfile(prevState => !prevState);
    }

    async function endEditProfile() {
        const result = await saveUserDetails(newProfile, props.user.username);
        console.log(result);

        if (result.success) {
            props.setUser((prevState) => {
                return {
                    ...prevState,
                    email: newProfile.email,
                    username: newProfile.username,
                    bio: newProfile.bio,
                };
            })
            setEditProfile((prevState) => !prevState);
            setNewProfile({});
        }else {
            console.log("Unable to save user details");
        }

    }

    async function saveUserDetails(newUserData, oldUsername) {
        console.log("Updating the user's data");
        try {
            const result = await fetch(`http://localhost:7000/profile`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        newUserData: newUserData,
                        username: oldUsername,
                    })
                })

            return await result.json()

        } catch (err) {
            console.log("Error communication to api: " + err.message);
        }
    }

    return (
        <div className="profile">
            <h1>Welcome - {props.user.username}</h1>
            <div className="user-info">
                <img
                    src="../../public/assets/boy.png"
                    alt="User Avatar"
                    className="avatar"
                />
                <div className="details">
                    {editProfile ? <input type={"text"}
                                          name={"Username"}
                                          defaultValue={props.user.username}
                                          placeholder={"username"}
                                          onChange={(e) => {
                                              setNewProfile((prevState) => {
                                                  return {
                                                      ...prevState,
                                                      username: e.target.value,
                                                  }
                                              });
                                          }}
                                          /> :
                        <h2>{props.user.username}</h2>}

                    {editProfile? <input type={"text"}
                                         name={"email"}
                                         defaultValue={props.user.email}
                                         placeholder={"Email"}
                                         onChange={(e) => {
                                             setNewProfile((prevState) => {
                                                 return {
                                                     ...prevState,
                                                     email: e.target.value,
                                                 }
                                             });
                                         }}
                        /> :
                        <div>
                            <p>Email:</p>
                            <p className={"email"}>{props.user.email}</p>
                        </div>
                        }

                    {editProfile? <textarea name={"bio"}
                                            defaultValue={props.user.bio}
                                            placeholder={"Bio"}
                                            onChange={(e) => {
                                                setNewProfile((prevState) => {
                                                    return {
                                                        ...prevState,
                                                        bio: e.target.value,
                                                    }
                                                });
                                            }}
                        /> :
                        <div>
                            <p>Bio:</p>
                            <p className={"bio"}>{props.user.bio}</p>
                        </div>
                    }
                </div>
                <button onClick={() => {
                    editProfile ? endEditProfile() : startEditProfile()
                }}>{editProfile? "Save" : "Edit"}</button>
            </div>
        </div>
    );
}
