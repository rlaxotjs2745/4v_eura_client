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
    const {
        cx,
        cy,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
    } = props;
    return (
        <g>
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

const InviteMyAnalPieGraphCard = ({oneUserResult, oneUserResultab}) => {
    const [initialState, setInitialState] = useState({activeIndex: 0});
    const COLORS = ['#3377ff', '#ffc633', 'gray'];

            return (
                <div className="result__one_user">
                    <div className="result__one_user_title"><span>분석 요약</span><span></span><span></span><span></span></div>
                    <div className="one_user_graph_content">
                        <div className="one_user_graph_box">
                            <div className="one_user_graph">
                                <PieChart width={150} height={150}>
                                    <Pie
                                        activeIndex={initialState.activeIndex}
                                        activeShape={renderActiveShape}
                                        data={oneUserResult}
                                        innerRadius={48}
                                        outerRadius={60}
                                    >
                                        {oneUserResult.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </div>
                            <div className="one_user_graph_image">
                                <img className="pie_graph_image" src={require(oneUserResultab.good >= 60 ? '../../assets/image/icon_one_user_good.png' : '../../assets/image/icon_one_user_bad.png')}/>
                                <div className={oneUserResultab.good >= 60 ? 'pie_graph_word imotion_good' : 'pie_graph_word imotion_bad'}>{oneUserResultab.good >= 60 ? 'GOOD' : 'BAD'}</div>
                            </div>
                        </div>
                        <div className="one_user_graph_sum_box">
                            <div className="one_user_graph_sum_category_box">
                                <div className="good_sum one_user_graph_sum_category"><span>Good</span><span>{oneUserResultab.good}%</span></div>
                                <div className="bad_sum one_user_graph_sum_category"><span>Bad</span><span>{oneUserResultab.bad}%</span></div>
                                <div className="camera_off_sum one_user_graph_sum_category"><span>Camera Off</span><span>{oneUserResultab.off}%</span></div>
                            </div>
                        </div>
                    </div>

                </div>
            );
}



export default InviteMyAnalPieGraphCard;