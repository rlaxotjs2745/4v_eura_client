import React from "react"

const AddMeetingUser = ({user, addUser}) => {

    return (
        <li onClick={() => addUser(user)}>
            <div >
                <figure>
                    <img src={user.ui_pic ? user.ui_pic : require('../../assets/image/image_profile.png')} alt=""/>
                </figure>
                <span className="team__user">
                    {user.uname}
                    <em>{user.email}</em>
                </span>
                <div className="checkbox type__square">
                </div>
            </div>
        </li>
    )
}

export default AddMeetingUser;