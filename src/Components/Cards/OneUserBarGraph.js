import {Bar, BarChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import React, {useEffect} from "react";


const OneUserBarGraph = ({userData, btmdata, isJoin}) => {


    return (
        // <div className="result__one_user_graph">
            <div className="result__analysis result_all_levels" title="분석그래프">
                {
                    userData ?
                        <div className="result__one_user_data ">
                            <div className="me_box one_user_data_obj">
                                <figure><img src={userData.upic ? userData.upic : require('../../assets/image/image_profile.png')} alt=""/></figure>
                                {userData.is_iam ? <img className="one_user_me" src={require('../../assets/image/team__badge.png')} alt=""/> : null}
                            </div>
                            <div className="one_user_data_obj one_user_data_name">{userData.is_host ? <img className="host_badge" src={require('../../assets/image/ic_host.png')} alt=""/> : null}{userData.uname}</div>
                            <span className="one_user_email one_user_data_obj">{userData.uemail}</span>
                        </div>
                        :
                        null
                }
                <div className="result__one_user_graph">
                    {
                        !isJoin || isJoin === 2 ?
                            <span>미참석한 미팅입니다.</span>
                            :
                            <>
                            <div className="graph_on_seek">
                                <div className="v-line"></div>
                                <div className="v-box"></div>
                            </div>
                                {
                                    // !btmdata || !btmdata.length ?
                                    //     '' :
                                        <>
                                            <div className="emotion__wraper">
                                                <div><img src={require('../../assets/image/icon_smile.png')}/></div>
                                                <div><img src={require('../../assets/image/icon_angry.png')}/></div>
                                            </div>
                                            <ResponsiveContainer width="92%" height="100%">
                                                <BarChart
                                                    data={btmdata ? btmdata : [{longP: 100, longM: -100}]}
                                                    stackOffset={"sign"}
                                                    margin={{top: 5, right: 30, left: 0, bottom: 5}}
                                                    maxBarSize={10}
                                                >
                                                    <XAxis dataKey="name" />
                                                    {
                                                        btmdata ?
                                                            <Tooltip /> : null
                                                    }
                                                    <ReferenceLine y={0} stroke="#000" />
                                                    <Bar dataKey="longP" fill="transparent" stackId="stack"/>
                                                    <Bar dataKey="longM" fill="transparent" stackId="stack"/>
                                                    <Bar dataKey="good" fill="#3377ff" stackId="stack" />
                                                    <Bar dataKey="bad" fill="#ffc633" stackId="stack" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </>
                                }
                            </>
                    }
                </div>
            </div>
        // </div>
    )
}

export default OneUserBarGraph;