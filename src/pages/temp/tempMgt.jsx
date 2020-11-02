/* eslint-disable */
/* 柯礼钦
 * 9/18/2020, 9:53:47 AM
 * doc comment for the file goes here
 */

/** Happy Coding */
import React, { ReactNode, ReactEventHandler, Component } from 'react';
import TempMgtPage from '../../components/page/temp/tempTableMgt';
import { createHashHistory } from 'history';

// import { Link } from 'react-router-dom';
// import { Icon } from 'antd';
const history = createHashHistory();

export default class TempMgt extends Component {
 constructor(props) {
    super(props);
    this.config = {
    };
    this.state = {
    };
  }

  UNSAFE_componentWillMount() { }

  componentDidMount() { 
    console.log(history)
  }

  componentDidShow() { }

  render() {
    return (
      <div className="temp-mgt-main layout-content-style">
        <TempMgtPage />
      </div>
    )
  }
}
