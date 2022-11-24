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
            {/*<ResponsiveContainer width="100%" height="8%">*/}
            {/*    <BarChart*/}
            {/*        data={data}*/}
            {/*        margin={{*/}
            {/*            top: 5,*/}
            {/*            right: 30,*/}
            {/*            left: 20,*/}
            {/*            bottom: 5,*/}
            {/*        }}*/}
            {/*        barSize={20}*/}
            {/*        layout={'vertical'}*/}
            {/*    >*/}
            {/*        <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />*/}
            {/*        <div>sdlfnslkfnsdlkv</div>*/}
            {/*        <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />*/}

            {/*    </BarChart>*/}
            {/*</ResponsiveContainer>*/}
        </div>
    )
}

export default AnalysisTimeLine;