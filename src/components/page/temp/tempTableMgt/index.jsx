/* eslint-disable */
/**柯礼钦
 * 9/18/2020, 9:57:09 AM
 * doc comment for the file goes here
 */

/** 测评卷模板管理 */
import React, { ReactNode, ReactEventHandler, Component } from 'react';
// import { Link } from 'react-router-dom';
import { Row, Col, Input, Button, Table } from 'antd';
import { createHashHistory } from 'history';
import './index.scss';
import fetch from '../../../../api/request';
const history = createHashHistory();

export default class TempTableMgt extends Component {
  constructor(props) {
    super(props);
    this.config = {
    };
    this.state = {
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
          id: '1'
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
          id: '2'
        },
      ],
      formData: {},//表单数据
    };
  }

  UNSAFE_componentWillMount() { 

  }

  componentDidMount() {
    return;
    fetch({
      url: 'temp/list',
      mock: true
    }).then(res => {
      console.log('res', res);
    })
  }

  /**
   * @description: 表格列的配置描述
   * @param null
   * @return {arr} 
   * @author: liqin
   */
  renderColumns = () => {
    return [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (cur, item) => {
          return <a onClick={() => {
            console.log('cur', cur, ', item', item)
            history.push(`/temp/tempTableMgt/detail/${item.id}`);//跳转详情
          }}>查看</a>
        }
      }]
  }

  /**
   * @description: 
   * @param {type} 
   * @return {type} 
   * @author: liqin
   */
  onReset = () => {
    this.setState({ formData: {} })
  }

  /**
   * @description: 
   * @param {type} 
   * @return {type} 
   * @author: liqin
   */
  onHandleChange = ({ key, value }) => {
    let { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [key]: value
      }
    }, ()=> {
      console.log('formdata', this.state.formData)
    })
  }

  onSearch = () => {
    console.log('search');
  }

  render() {
    let { dataSource, formData } = this.state;
    return (
      <div className="temp-table-mgt-main">
        <div className="temp-table-mgt-main_style">
          123
        </div>
        <div className="temp-table-mgt-main-form">
          <Row type="flex" gutter={20}>
            <Col>
              <Input placeholder="请输入姓名" onChange={e => { this.onHandleChange({ key: 'name', value: e.target.value }) }} value={formData.name || undefined} />
            </Col>
            <Col>
              <Row type="flex" gutter={10}>
                <Col>
                  <Button onClick={this.onReset}>重置</Button>
                </Col>
                <Col>
                  <Button type="primary" onClick={this.onSearch}>查询</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="temp-table-mgt-main-table">
          <Table dataSource={dataSource} columns={this.renderColumns()} size="middle" />
        </div>
      </div>
    )
  }
}
