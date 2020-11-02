/* eslint-disable */
/**柯礼钦
 * 9/21/2020, 11:11:55 AM
 * doc comment for the file goes here
 */

/** 详情 */
import React, { ReactNode, ReactEventHandler, Component } from 'react';
import TempDetailPage from '../../components/page/temp/tempDetail';
// import { Link } from 'react-router-dom';
// import { Icon } from 'antd';

export default class TempDetail extends Component {
  constructor(props) {
    super(props);
    this.config = {
    };
    this.state = {
    };
  }

  UNSAFE_componentWillMount() { }

  componentDidMount() { }

  componentDidShow() { }

  render() {
    return (
      <div className="temp-detail-page-main layout-content-style">
        <TempDetailPage />
      </div>
    )
  }
}
