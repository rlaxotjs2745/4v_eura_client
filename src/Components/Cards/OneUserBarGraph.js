import {Bar, BarChart, ReferenceLine, ResponsiveContainer, Tooltip} from "recharts";
import React from "react";


const OneUserBarGraph = ({btmdata}) => {


    return (
        <div className="result__analysis result_all_levels" title="분석그래프">
            {
                !btmdata || !btmdata.length ?'':
                    <>
                        <div className="emotion__wraper">
                            <div className="emotion__num">1</div>
                            <div className="emotion__num">0</div>
                        </div>
                        <ResponsiveContainer width="100%" height="80%">
                            <BarChart
                                data={btmdata}
                                stackOffset="sign"
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 0,
                                    bottom: 5,
                                }}
                                maxBarSize={200}
                            >
                                {/*<CartesianGrid strokeDasharray="3 3" />*/}
                                {/*<XAxis dataKey="name" />*/}
                                {/*<YAxis />*/}
                                <Tooltip />
                                {/*<Legend />*/}
                                <ReferenceLine y={0} stroke="#000" />
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