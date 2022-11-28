import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';


const AnalysisTimeLine = () => {

    const data = [
        {
            name: 'Page C',
            pv: 980,
        },
        {

        }
    ];

    return (
        <div className="result__anal_timeline">
            <div className="result__anal_timeline_title" >그래프 타임라인 분석</div>
            <div className="result__anal_timeline_point">
                <div className="anal_timeline_point">62</div>
                <div className="anal_timeline_point_desc">전체 점수</div>
            </div>
        </div>
    )
}

export default AnalysisTimeLine;