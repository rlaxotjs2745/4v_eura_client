import React, {useEffect, useState} from "react";

const AnalysisUserList = ({lecture ,userList, clickUser, isHost}) => {
    return (
        <div className={isHost ? 'result__user' : 'result__user not_host'}>
            <h4 className="result__title">참석자 목록({!lecture || !lecture.mtInviteInfo ? '0' : lecture.mtInviteInfo.user_invite}/{!lecture || !lecture.mtInviteInfo ? '0' : lecture.mtInviteInfo.user_total})</h4>
            <div className="result__watch">
                <ul>
                    {
                        !userList.length ?
                            <span className="file__name">참석자가 없습니다.</span>
                            :
                            userList.map(member => {
                                return (
                                    <li key={member.idx}>
                                        <button onClick={() => clickUser(member.idx)}>
                                            <figure><img src={member.upic?member.upic: require('../../assets/image/image_profile.png')} alt=""/></figure>
                                            <div className="watch__td">
                                                {member.is_host ? <img src={require('../../assets/image/ic_host.png')} alt=""/> : null}
                                                <span>{member.uname}</span>
                                                <div>{member.uemail}</div>
                                                {member.is_iam ? <span className="team__badge">나</span> : null}
                                            </div>
                                            {
                                                member.value !== null ?
                                                    <div className="watch__percent is-good">{Math.round(member.value)}%</div>
                                                    : ""
                                            }
                                        </button>
                                    </li>
                                )
                            })
                    }
                    {/*{*/}
                    {/*    !lecture.mtInviteList || !lecture.mtInviteList.length*/}
                    {/*        ?*/}
                    {/*        <span className="file__name">참석자가 없습니다.</span>*/}
                    {/*        :*/}
                    {/*        lecture.mtInviteList.map(member => {*/}
                    {/*            if(member.is_iam) {*/}
                    {/*                return (*/}
                    {/*                    <li key={member.idx}>*/}
                    {/*                        <button onClick={() => clickUser(member.idx)}>*/}
                    {/*                            <figure><img src={member.upic?member.upic: require('../../assets/image/image_profile.png')} alt=""/></figure>*/}
                    {/*                            <div className="watch__td">*/}
                    {/*                                {member.is_host ? <img src={require('../../assets/image/ic_host.png')} alt=""/> : null}*/}
                    {/*                                <span>{member.uname}</span>*/}
                    {/*                                <div>{member.uemail}</div>*/}
                    {/*                                <span className="team__badge">나</span>*/}
                    {/*                            </div>*/}
                    {/*                            {*/}
                    {/*                                member.value !== null ?*/}
                    {/*                                <div className="watch__percent is-good">{Math.round(member.value)}%</div>*/}
                    {/*                                : ""*/}
                    {/*                            }*/}
                    {/*                        </button>*/}
                    {/*                    </li>*/}
                    {/*                )*/}
                    {/*            }*/}
                    {/*        })*/}
                    {/*}*/}
                    {/*{*/}
                    {/*    !lecture.mtInviteList || !lecture.mtInviteList.length*/}
                    {/*        ?*/}
                    {/*        null*/}
                    {/*        :*/}
                    {/*        lecture.mtInviteList.map(member => {*/}
                    {/*            if(member.is_host && !member.is_iam) {*/}
                    {/*            return (*/}
                    {/*                <li key={member.idx}>*/}
                    {/*                    <button onClick={() => clickUser(member.idx)}>*/}
                    {/*                        <figure><img src={member.upic?member.upic: require('../../assets/image/image_profile.png')} alt=""/></figure>*/}
                    {/*                        <div className="watch__td"><span>{member.uname}</span><div>{member.uemail}</div></div>*/}
                    {/*                        {*/}
                    {/*                            member.value !== null ?*/}
                    {/*                                <div className="watch__percent is-good">{Math.round(member.value)}%</div>*/}
                    {/*                                : ""*/}
                    {/*                        }*/}
                    {/*                    </button>*/}
                    {/*                </li>*/}
                    {/*            )}*/}
                    {/*        })*/}
                    {/*}*/}
                    {/*{*/}
                    {/*    !lecture.mtInviteList || !lecture.mtInviteList.length*/}
                    {/*        ?*/}
                    {/*        null*/}
                    {/*        :*/}
                    {/*        lecture.mtInviteList.map(member => {*/}
                    {/*            if(member.is_host || member.is_iam){*/}
                    {/*                return (*/}
                    {/*                    <li key={member.idx}>*/}
                    {/*                        <button onClick={() => clickUser(member.idx)}>*/}
                    {/*                            <figure><img src={member.upic?member.upic: require('../../assets/image/image_profile.png')} alt=""/></figure>*/}
                    {/*                            <div className="watch__td"><span>{member.uname}</span><div>{member.uemail}</div></div>*/}
                    {/*                            {*/}
                    {/*                                member.value !== null ?*/}
                    {/*                                    <div className="watch__percent is-good">{Math.round(member.value)}%</div>*/}
                    {/*                                    : ""*/}
                    {/*                            }*/}
                    {/*                        </button>*/}
                    {/*                    </li>*/}
                    {/*                )*/}
                    {/*            }*/}
                    {/*        })*/}
                    {/*}*/}
                </ul>
            </div>
        </div>
    )
}

export default AnalysisUserList