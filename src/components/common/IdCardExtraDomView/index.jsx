/* eslint-disable */
/**礼钦
 * 5/6/2020, 4:05:50 PM
 * doc comment for the file goes here
 */

/** 身份证表单额外功能区（OCR识别、人口库人口校验） */
import React, { ReactNode, ReactEventHandler, Component, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Icon, Row, Col, Divider, Modal, Spin, Menu, Upload, message } from 'antd';
import './index.scss';
import fetch from '../../../api/request';
import { checkIdCard } from '../../../utils/idCardUtil';

export default function IdCardExtraDomView({
  ocrCallBack = (data) => { },//ocr识别回调函数
  inspectCallBack = (data) => { },//验证证件号码识别函数
  idcard = '',//证件号码
  setData = (data) => { } //父级组件状态控制函数，例如可作用于请求时，页面loading的设置，等等...
}) {

  const [visible, setVisible] = useState(false); //附件选择弹窗
  const [uploadLoading, setUploadLoading] = useState(false); //识别loading状态

  //识别按钮公共，ocr上传识别参数
  function uploadProps({ url }) {
    let _this = this;
    return {
      fileList: [],
      customRequest: (option) => {
        let reader = new FileReader();
        reader.readAsDataURL(option.file);
        reader.onload = function () {
          setUploadLoading(true);
          fetch({
            url: `hik-common/api/v1/baiducloud/${url}`,
            method: 'post',
            processData: false,
            data: {
              base64Img: this.result
            }
          }).then(res => {
            if (res) {
              // 将识别成功返回的参数，进行下一步请求
              findByOcr(res);
            }
          })
        }
      }
    }
  }

  //查询人口（通过personOcrId）
  function findByOcr(res) {
    fetch({
      url: `hik-grided-so/api/v1/person/findByOcr`,
      params: {
        personOcrId: res.personOcrId
      }
    }).then(res => {
      //关闭选择弹窗
      setVisible(false);
      setUploadLoading(false);
      if (res) {
        message.success('识别成功');
        ocrCallBack && ocrCallBack(res);
      }
    })
  }

  // 验证按钮功能
  function inspect() {
    if (idcard && checkIdCard(idcard)) {
      setData({ spinning: true })
      fetch({
        url: 'hik-grided-so/api/v1/person/getOne',
        params: {
          filter: JSON.stringify({
            idcard: idcard
          })
        }
      }).then(res => {
        setData({ spinning: false });
        if (res) {
          message.success('验证成功');
          inspectCallBack && inspectCallBack(res);
        }
      })
    } else {
      if (!idcard) {
        message.warning('身份证号码不能为空');
      } else {
        message.warning('身份证号码格式不正确');
      }
    }
  }


  return (
    <div className="id-card-extra-dom-view-main">
      <Row type="flex" gutter={5} style={{ flexWrap: 'nowrap' }}>
        <Col style={{ cursor: 'pointer' }} onClick={() => setVisible(true)}>
          识别
        </Col>
        <Col>
          <Divider type="vertical" />
        </Col>
        <Col style={{ cursor: 'pointer' }} onClick={inspect}>
          验证
        </Col>
      </Row>
      {/* 扫描附件弹窗 */}
      <Modal
        title="扫描附件"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Spin spinning={uploadLoading} tip="识别中">
          <Menu style={{ border: 0 }}>
            <Menu.Item style={{ width: '100%' }}><Upload {...uploadProps({ url: 'idCardRecogByBase64' })}><div>扫描身份证</div></Upload></Menu.Item>
            <Menu.Item style={{ width: '100%' }}><Upload {...uploadProps({ url: 'residenceBookletRecogByBase64' })}>扫描户口本页</Upload></Menu.Item>
          </Menu>
        </Spin>
      </Modal>

    </div>
  )
}
