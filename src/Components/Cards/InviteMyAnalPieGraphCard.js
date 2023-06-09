import React from 'react';
import {
    Pie, PieChart, Cell, Sector
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

const InviteMyAnalPieGraphCard = ({oneUserResult, oneUserResultab, isJoin}) => {
    const initialState = {activeIndex: 0}
    const COLORS = [
        '#3377ff',
        '#ffc633',
        '#b4b6bf'
    ];

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
                                        data={isJoin ? oneUserResult : [
                                            { name: "Good", value: 0 },
                                            { name: "Bad", value: 0 },
                                            { name: "Camera Off", value: 100 },
                                        ]}
                                        innerRadius={48}
                                        outerRadius={60}
                                    >
                                        {
                                            oneUserResult.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                                            ))
                                        }
                                    </Pie>
                                </PieChart>
                            </div>
                            {
                                oneUserResultab.off === 100 || !isJoin || isJoin === 2 ?
                                    null :
                                    <div className="one_user_graph_image">
                                        {isJoin ? <img className="pie_graph_image" src={require(oneUserResultab.good >= oneUserResultab.bad ? '../../assets/image/icon_one_user_good.png' : '../../assets/image/icon_one_user_bad.png')} alt=""/> : null}
                                        {isJoin ? <div className={oneUserResultab.good >= oneUserResultab.bad ? 'pie_graph_word imotion_good' : 'pie_graph_word imotion_bad'}>{oneUserResultab.good >= oneUserResultab.bad ? 'GOOD' : 'BAD'}</div>: null}
                                    </div>
                            }
                        </div>
                        <div className="one_user_graph_sum_box">
                            <div className="one_user_graph_sum_category_box">
                                <div className="good_sum one_user_graph_sum_category"><span>Good</span><span>{isJoin && isJoin !== 2 ? oneUserResultab.good + '%' : '-'}</span></div>
                                <div className="bad_sum one_user_graph_sum_category"><span>Bad</span><span>{isJoin && isJoin !== 2 ? oneUserResultab.bad + '%' : '-'}</span></div>
                                <div className="camera_off_sum one_user_graph_sum_category"><span>Camera Off</span><span>{isJoin && isJoin !== 2 ? oneUserResultab.off + '%' : '-'}</span></div>
                            </div>
                        </div>
                    </div>

                </div>
            );
}



export default InviteMyAnalPieGraphCard;