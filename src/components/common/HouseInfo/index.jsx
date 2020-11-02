/* eslint-disable */
/**柯礼钦
 * 4/7/2020, 11:43:26 AM
 * doc comment for the file goes here
 */

/** 房屋信息组件 */
import React, { ReactNode, ReactEventHandler, Component } from 'react';
// import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import './index.scss';
import {objConcatUrl} from "../../../utils/utils";

export default function HouseInfo({ }) {
    // 获取缓存里的房屋信息
    let houseInfo = window.localStorage.getItem('houseInfo') == 'undefined' ? undefined : window.localStorage.getItem('houseInfo')
    houseInfo = houseInfo && JSON.parse(houseInfo);
    return (
        <div className="house-info-main">
            {
                houseInfo && <div className="house-info-main-address">
                    <a>{houseInfo.houseaddress}</a>
                    <div className="house-info-main-fuc" onClick={()=>{
                        window.location.href = '#/collect/houseinfo?houseId=' +houseInfo.houseId;

                    }}>
                        <Icon type="edit" /> 编辑房屋
                    </div>
                </div>
            }
        </div>
    )
}
