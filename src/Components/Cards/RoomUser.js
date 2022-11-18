import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css"
const React = require("react");
const {useState} = require("react");





const RoomUser = ({inv}) =>
        <li className={inv.is_live ? 'user' : 'user is-disabled'}>
            <figure><img src={inv.picture ? inv.picture : require('../../assets/image/image_profile.png')} alt="" /></figure>
            <span className="team__user">{inv.uname}<em>{inv.email}</em></span>
        </li>


export default RoomUser;