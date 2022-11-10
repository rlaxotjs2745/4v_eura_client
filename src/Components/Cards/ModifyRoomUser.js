import React from "react"

const ModifyRoomUser = ({user, excludeUser}) => {



    return (
        <li>
            <div>
                <figure>
                    <img src={user.ui_pic ? user.ui_pic : require('../../assets/image/image_profile.png')} alt=""/>
                </figure>
                <span className="team__user">
                                        {user.uname}
                                        <em>{user.email}</em>
                                    </span>
                <div className="btn btn__delete" onClick={() => excludeUser(user)}>
                    <img src="../../assets/image/ic_cancle-circle_18.png" alt="삭제"/>
                </div>
            </div>
        </li>
    )
}

export default ModifyRoomUser;