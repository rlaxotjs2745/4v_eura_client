import React, {useState, useEffect} from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Pie,
    PieChart, Cell, Sector
} from 'recharts';

const renderActiveShape = props => {
    const RADIAN = Math.PI / 180;
    console.log(RADIAN);
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    console.log("midAngle", midAngle);
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {/*{payload.name}*/}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    );
};

const InviteMyAnalPieGraphCard = () => {
    const [initialState, setInitialState] = useState({activeIndex: 0});
    const data = [
        { name: "Good", value: 700 },
        { name: "Bad", value: 200 },
        { name: "Camera Off", value: 100 },
    ];
    const COLORS = ['#3377ff', '#ffc633', 'gray'];

            return (
                <div className="result__one_user">

                    <div className="one_user_graph">
                        <PieChart width={200} height={200}>
                            <Pie
                                activeIndex={initialState.activeIndex}
                                activeShape={renderActiveShape}
                                data={data}
                                innerRadius={80}
                                outerRadius={100}
                                // onMouseEnter={this.onPieEnter}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                        </PieChart>
                        <div className="one_user_graph_image">
                            <img className="pieImage" src={require('../../assets/image/icon_angry.png')}/>
                        </div>
                    </div>
                </div>
            );
}



export default InviteMyAnalPieGraphCard;