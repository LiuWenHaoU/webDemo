/* eslint-disable */
/**柯礼钦
 * 4/19/2020, 11:10:51 AM
 * doc comment for the file goes here
 */

/** 上传组件 */
import React, { ReactNode, ReactEventHandler, Component, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Icon, Upload, Modal, message } from 'antd';
import './index.scss';
import { BASE_URL } from '../../../api/httpurl';
import fetch from '../../../api/request';

export default function UploadView({ count = false, action = `${BASE_URL}hik-grided-sys/api/v1/sys/attachment/uploadFile?appId=1&posId=${JSON.parse(window.localStorage.getItem('loginUser')).posId}`, listType = 'picture-card', fileList = [], multiple = false, params = { associateTypeId: '', ownerId: '' }, text = "上传", onHandleChange = (data) => { } }) {
    const [files, setFiles] = useState(fileList);
    function onChange({ file, fileList, event }) {
        console.log('具体附件', fileList);
        setFiles(fileList);
        if (file.status == 'done' && file.response.code !== '0') {
            let fileAllow = fileList.filter(({ uid }) => (uid !== file.uid))
            message.error(file.response.msg);
            setFiles(fileAllow);
            onHandleChange({ fileList: fileAllow, file, params })
        }
        if (file.status == 'done' && file.response.code == '0') {
            // // 完成请求过程,也要判断是否请求成功,对页面显示的附件进行重新筛选
            // let fileAllow = fileList.reduce((p, n) => (
            //     n.response && n.response.code == '0' ? p.concat({ ...n, id: n.response.data.id, ...params }) : p
            // ), []);
            message.success('上传成功');
            if (params.ownerId) {
                let p = new Promise((resolve, reject) => {
                    fetch({
                        url: `hik-grided-sys/api/v1/sys/attachment/attachmentassociate/insert`,
                        method: 'POST',
                        data: {
                            ...params,
                            attachmentId: file.response.data.id
                        }
                    }).then(res => {
                        resolve(res)
                    })
                });
            }
            setFiles(fileList);
            onHandleChange({ fileList, file, params })
        }
    }

    // 删除附件
    function onRemove(file) {
        let id = file.id || file.response.data.id;
        fetch({
            url: `hik-grided-sys/api/v1/sys/attachment/deleteById`,
            params: {
                id
            }
        }).then(res => {
            message.success('删除成功');
            let filesList = files ? files.filter(f => f.id !== id) : [];
            setFiles(filesList)
        })
    }

    // 预览附件
    function onPreview(file) {
        console.log(file);
        // if(file)
        if (file.response) {
            window.open(`${BASE_URL}hik-grided-sys/api/v1/sys/attachment/download?attachmentId=${file.response.data.attachmentId}&online=true`);
        }
        if (file.url) {
            window.open(file.url);
        }
    }

    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">{text}</div>
        </div>
    );
    return (
        <div className="upload-view-main h-100 flex-box-column">
            <Upload
                fileList={files ? files.map(({ id, thumbUrl, ...a }, idx) => ({ uid: idx, key: id, ...a, id, url: id ? `${BASE_URL}hik-grided-sys/api/v1/sys/attachment/download?attachmentId=${id}&online=true` : thumbUrl })) : []}
                action={action}
                headers={{
                    Authorization: window.localStorage.getItem('token')
                }}
                data={{
                    ...params
                }}
                name="file"
                listType={listType}
                multiple={multiple}
                onRemove={onRemove}
                onChange={onChange}
                onPreview={onPreview}
            >
                {/* {uploadButton} */}
                {count ? files.length < count && uploadButton : uploadButton}
            </Upload>

        </div>
    )
}
