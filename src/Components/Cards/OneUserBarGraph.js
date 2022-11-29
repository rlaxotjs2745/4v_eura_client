import {Bar, BarChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import React from "react";


const OneUserBarGraph = ({btmdata}) => {


    return (
        <div className="result__analysis result_all_levels" title="분석그래프">
            <div className="graph_on_seek">
                <div className="v-line"></div>
                <div className="v-box"></div>
            </div>
            {
                // !btmdata || !btmdata.length ?'':
                    <>
                        <div className="emotion__wraper">
                            <div><img src={require('../../assets/image/icon_smile.png')}/></div>
                            <div><img src={require('../../assets/image/icon_angry.png')}/></div>
                        </div>
                        <ResponsiveContainer width="92%" height="100%">
                            <BarChart
                                data={btmdata}
                                stackOffset={"sign"}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 0,
                                    bottom: 5,
                                }}
                                maxBarSize={10}
                            >
                                <XAxis dataKey="name" />
                                <Tooltip />
                                <ReferenceLine y={0} stroke="#000" />
                                <Bar dataKey="longP" fill="transparent" stackId="stack"/>
                                <Bar dataKey="longM" fill="transparent" stackId="stack"/>
                                <Bar dataKey="good" fill="#3377ff" stackId="stack" />
                                <Bar dataKey="bad" fill="#ffc633" stackId="stack" />
                            </BarChart>
                        </ResponsiveContainer>
                    </>
            }
        </div>
    )
}

export default OneUserBarGraph;