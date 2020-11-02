/* eslint-disable */
/**柯礼钦
 * 9/21/2020, 11:13:20 AM
 * doc comment for the file goes here
 */

/** 测评卷模板详情 */
import React, { ReactNode, ReactEventHandler, Component } from 'react';
// import { Link } from 'react-router-dom';
import { Icon, Table, Row, Col, Button, Input, Modal, message } from 'antd';
import './index.scss';
import { createHashHistory } from "history";
const history = createHashHistory();

export default class TempDetail extends Component {
  constructor(props) {
    super(props);
    this.config = {
    };
    this.state = {
      // dataSource: [{ key: Date.now() }],
      dataSource: [],
      visible: false,
      loading: false
    };
  }

  UNSAFE_componentWillMount() { }

  componentDidMount() { }

  /**
   * @description: 
   * @param {type} 
   * @return {type} 
   * @author: liqin
   */
  renderColumns = () => {
    return [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (cur, item, index) => {
        return index + 1
      }
    }, {
      title: '测评项目',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '测评描述',
      dataIndex: 'setting',
      key: 'setting',
      width: '30%',
      render: (cur, item, index) => {
        return <Input onChange={e => this.onHandleChange({ ...item, index, value: e.target.value, name: 'desc' })} value={item['desc'] || undefined} placeholder="请输入" />
      }
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (cur, item) => {
        return <Row>
          <Col><a onClick={() => {
            this.onDel(item)
          }}>删除</a></Col>
        </Row>
      }
    }]
  }

  /**
   * @description: 表单元素change函数
   * @param item 
   * @return null
   * @author: liqin
   */
  onHandleChange = (item) => {
    let { index, value, name } = item;
    let { dataSource } = this.state;
    dataSource[index][name] = value;
    console.log(dataSource)
    this.setState({ dataSource })
  }

  /**
   * @description: 删除项目
   * @param item 
   * @return null 
   * @author: liqin
   */
  onDel = (item) => {
    console.log('item', item)
    let { dataSource } = this.state;
    dataSource = dataSource.filter((d) => (d.key != item.key))
    this.setState({ dataSource })
  }

  /**
   * @description: 
   * @param {type} 
   * @return {type} 
   * @author: liqin
   */
  onAdd = () => {
    let { dataSource } = this.state;
    console.log('新增项目');
    this.setState({
      dataSource: dataSource.concat({ key: Date.now() })
    })
  }

  /**
   * @description: 收集表单
   * @param null 
   * @return null 
   * @author: liqin
   */
  onSave = () => {
    let { dataSource } = this.state;
    console.log('dataSource', dataSource)
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      message.success({
        content: '提交成功'
      })
    }, 1000)

  }

  openModal = () => {
    this.setState({ visible: true })
  }

  onCancel = () => {
    this.setState({ visible: false })
  }

  onBack = () => {
    history.goBack();
  }

  render() {
    let { dataSource, visible, loading } = this.state;
    return (
      <div className="temp-detail-main">
        <div className="temp-detail-main-primary_title">
          模板详情
        </div>
        <div style={{ padding: '20px 0' }}>
          第一部分
        </div>
        <Row>
          <Col><Button type="primary" onClick={this.onAdd}>新增项目</Button></Col>
        </Row>
        <div className="padding-tb">
          <Table dataSource={dataSource} columns={this.renderColumns()} size="small" pagination={false} />
        </div>
        <div>
          <Button type="primary" onClick={this.onSave} loading={loading}>收集表单</Button>
        </div>

        <div className="padding-tb">
          <Button onClick={this.openModal}>弹窗的使用(打开)</Button>
        </div>
        <div>
          <Modal visible={visible} onCancel={this.onCancel} />
        </div>

        <div className="padding-tb" style={{ cursor: 'pointer', display: 'inline-block' }} onClick={this.onBack}>
          <Icon type="rollback" /> 返 回
        </div>
      </div>
    )
  }
}

