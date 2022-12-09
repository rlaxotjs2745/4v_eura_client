import React, {useState, useEffect} from 'react';
import {Bar, BarChart, ReferenceArea, ReferenceLine, ResponsiveContainer, XAxis, Tooltip} from "recharts";


const AllUserBarGraph = ({middata}) => {
    return (
        <div className="result__graph result_all_levels result__all_user_graph" title="그래프자리 (860 x 218)">
            <div className="graph_on_seek"><div class="v-line"></div><div class="v-box"></div></div>
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
                                stackOffset={"sign"}
                                height={218}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 0,
                                    bottom: 5,
                                }}
                                maxBarSize={10}
                                baseValue={0}
                            >
                                <XAxis dataKey="name" />
                                <Tooltip
                                    separator={"  "}
                                    payload={[...middata.map(data => {
                                        return {
                                            ...data,
                                            Bad: data.Bad,
                                            Good: data.Good
                                        }
                                    })]}
                                />
                                <ReferenceLine y={0} stroke="#000" />
                                <Bar dataKey="longP" fill="transparent" stackId="stack"/>
                                <Bar dataKey="longM" fill="transparent" stackId="stack"/>
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