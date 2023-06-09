import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";
import React from "react";


const MeetingAnalysisPieGraph = ({data}) => {

    const COLORS = [
        '#3377ff',
        '#ffc633',
        '#b4b6bf'
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="summary__graph" title="반원그래프 / 분석요약 TEXT">
            <div className="all_user_pie_graph" style={{ width: "56%", height: 280 } }>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            startAngle={0}
                            endAngle={180}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="analysis_sumup">
                <div className="analysis_sum__title">분석 요약</div>
                {
                    data.map((d,idx) => {
                        return (
                            d.name === 'Good' ?
                                <div key={idx} className="good_sum analysis_sum_category"><span>Good</span><span>{Math.round(d.value)}%</span></div>
                                : d.name === 'Bad' ?
                                <div key={idx} className="bad_sum analysis_sum_category"><span>Bad</span><span>{Math.round(d.value)}%</span></div>
                                : d.name === 'Camera off' ?
                                <div key={idx} className="camera_off_sum analysis_sum_category"><span>Camera Off</span><span>{Math.round(d.value)}%</span></div>
                                    : null
                        )
                    })
                }
            </div>
            <div className="analysis_info">
                <img src="../assets/image/graph_attend.png" alt="" /> 감정분석 인식 실패 데이터도 Camera Off에 포함됩니다.
            </div>
        </div>
    )
}

export default MeetingAnalysisPieGraph;