import OneUserBarGraph from "./OneUserBarGraph";
import React from "react";
import InviteMyAnalPieGraphCard from "./InviteMyAnalPieGraphCard";


const AnalyseAllUserGraphRow = ({btmdata, isJoin, oneUserResult, oneUserResultab, hideAllUserGraph}) => {

    return (
        <>
            {
                btmdata.map((a, idx) => {
                    return (
                        <div>
                            <OneUserBarGraph btmdata={btmdata[idx]} isJoin={isJoin} />
                            <InviteMyAnalPieGraphCard isJoin={isJoin} oneUserResult={oneUserResult[idx]} oneUserResultab={oneUserResultab[idx]} />
                        </div>
                    )
                })
            }
            <div id="hide_all_user_graph" className="btm_data_box" onClick={hideAllUserGraph}>
                <div className="display_all_user_graph">참석자별 전체결과 닫기</div>
            </div>
        </>
    )

}


export default AnalyseAllUserGraphRow;