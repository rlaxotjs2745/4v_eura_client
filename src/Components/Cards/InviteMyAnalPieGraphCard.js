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
                <div><img className="pieImage" src={require('../../assets/image/icon_angry.png')}/></div>
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
            {payload.name !== "No Data Found" && (
                <React.Fragment>
                    <path
                        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                        stroke={fill}
                        fill="none"
                    />
                    <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                    <text
                        x={ex + (cos >= 0 ? 1 : -1) * 12}
                        y={ey}
                        textAnchor={textAnchor}
                        fill="#333"
                    >{`PV ${value}`}</text>
                    <text
                        x={ex + (cos >= 0 ? 1 : -1) * 12}
                        y={ey}
                        dy={18}
                        textAnchor={textAnchor}
                        fill="#999"
                    >
                        {`(Rate ${(percent * 100).toFixed(2)}%)`}
                    </text>
                </React.Fragment>
            )}
        </g>
    );
};

const InviteMyAnalPieGraphCard = () => {
    const [initialState, setInitialState] = useState({activeIndex: 0});
    const data = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 }
    ];
    const data1 = [
        { name: "No Data Found", value: 1 },
        { name: "No Data Found", value: 1 },
        { name: "No Data Found", value: 1 }
    ];
    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

            return (
                <div className="result__one_user">
                    <PieChart width={400} height={400}>
                        <Pie
                            activeIndex={initialState.activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx={300}
                            cy={200}
                            innerRadius={60}
                            outerRadius={80}
                            // onMouseEnter={this.onPieEnter}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>
            );
}



export default InviteMyAnalPieGraphCard;