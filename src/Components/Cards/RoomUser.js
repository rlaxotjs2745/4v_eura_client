// import {Swiper, SwiperSlide} from "swiper/react";
// import {Navigation, Pagination} from "swiper";
// import "swiper/swiper.min.css";
// import "swiper/swiper-bundle.min.css"
const React = require("react");
// const {useState} = require("react");



const RoomUser = ({inv, roomInfo}) => {
        return inv.is_host || inv.is_iam ? null :
            !roomInfo.mt_live || (roomInfo.mt_live && inv.is_status === 0) ?
            <li className='user is-disabled'>
                    <>
                            <figure><img
                                src={inv.ui_pic ? inv.ui_pic : require('../../assets/image/image_profile.png')}
                                alt=""/></figure>
                            <span className="team__user">{inv.uname}<em>{inv.email}</em></span>
                            {!!inv.is_iam ? <span className="team__badge">나</span> : ''}
                    </>
            </li> :
                roomInfo.mt_live && inv.is_status === 2 ?
                    <li className='user hilight__normal'>
                        <>
                            <figure><img
                                src={inv.ui_pic ? inv.ui_pic : require('../../assets/image/image_profile.png')}
                                alt=""/></figure>
                            <span className="team__user">{inv.uname}<em>{inv.email}</em></span>
                            {!!inv.is_iam ? <span className="team__badge">나</span> : ''}
                        </>
                    </li> :
                    roomInfo.mt_live && inv.is_status === 3 ?
                        <li className='user hilight__bad'>
                            <>
                                <figure><img
                                    src={inv.ui_pic ? inv.ui_pic : require('../../assets/image/image_profile.png')}
                                    alt=""/></figure>
                                <span className="team__user">{inv.uname}<em>{inv.email}</em></span>
                                {!!inv.is_iam ? <span className="team__badge">나</span> : ''}
                            </>
                        </li> :
                        roomInfo.mt_live && inv.is_status === 4 ?
                            <li className='user'>
                                <>
                                    <figure><img
                                        src={inv.ui_pic ? inv.ui_pic : require('../../assets/image/image_profile.png')}
                                        alt=""/></figure>
                                    <span className="team__user">{inv.uname}<em>{inv.email}</em></span>
                                    <span className="badge__camera"><img src={require('../../assets/image/ic_camera_off.png')} alt="" /></span>
                                    {!!inv.is_iam ? <span className="team__badge">나</span> : ''}
                                </>
                            </li> :
                            <li className='user'>
                                <>
                                    <figure><img
                                        src={inv.ui_pic ? inv.ui_pic : require('../../assets/image/image_profile.png')}
                                        alt=""/></figure>
                                    <span className="team__user">{inv.uname}<em>{inv.email}</em></span>
                                    {!!inv.is_iam ? <span className="team__badge">나</span> : ''}
                                </>
                            </li>
}


export default RoomUser;