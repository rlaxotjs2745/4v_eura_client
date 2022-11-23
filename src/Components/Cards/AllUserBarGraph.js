import React, {useState, useEffect} from 'react';
import {Bar, BarChart, ReferenceLine, ResponsiveContainer, Tooltip} from "recharts";


const AllUserBarGraph = ({middata}) => {

    return (
        <div className="result__graph result_all_levels" title="그래프자리 (860 x 218)">
            {
                !middata || !middata.length ?'':
                    <>
                        <div className="emotion__wraper">
                            <div><img src={require('../../assets/image/icon_smile.png')}/></div>
                            <div><img src={require('../../assets/image/icon_angry.png')}/></div>
                        </div>
                        <ResponsiveContainer width="92%" height="100%">
                            <BarChart
                                data={middata}
                                stackOffset="sign"
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 0,
                                    bottom: 5,
                                }}
                                maxBarSize={100}
                            >
                                {/*<CartesianGrid strokeDasharray="3 3" />*/}
                                {/*<XAxis dataKey="name" />*/}
                                {/*<YAxis />*/}
                                <Tooltip
                                    separator={"  "}
                                />
                                {/*<Legend />*/}
                                <ReferenceLine y={0} stroke="#000" />
                                <Bar dataKey="Good" fill="#3377ff" stackId="stack" />
                                <Bar dataKey="Bad" fill="#ffc633" stackId="stack" />
                            </BarChart>
                        </ResponsiveContainer>
                    </>
            }
        </div>
    )
}

export default AllUserBarGraph;