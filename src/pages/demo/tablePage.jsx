/* eslint-disable */
/**柯礼钦
 * 9/23/2020, 9:20:13 AM
 * doc comment for the file goes here
 */

/** Happy Coding */
import React, { ReactNode, ReactEventHandler, Component } from 'react';
import { createHashHistory } from 'history'
// import { Link } from 'react-router-dom';
// import { Icon } from 'antd';
const history = createHashHistory()

export default class TablePage extends Component {
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
      <div className="table-page-page-main layout-content-style">

      </div>
    )
  }
}
//export default function TablePage({  }) {
//    return (
//     <div className="table-page-page-main layout-content-style">
//
//      </div>
//    )
//}
