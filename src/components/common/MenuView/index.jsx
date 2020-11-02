/* eslint-disable */
/**柯礼钦
 * 4/2/2020, 11:22:51 AM
 * doc comment for the file goes here
 */

/** 菜单渲染组件 */

import React, { useState } from 'react';
import { Layout, Menu, Icon, Badge } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import './index.scss';

const { SubMenu, Item } = Menu;

export default function MenuView({
    pathname,
    menudata,
    history,
}) {
    if (!menudata.length) return null;

    const { path, name, parentKey } = find(menudata, pathname);
    console.log('parentKey', parentKey)

    if (name) {
        const index = name.indexOf(' - ');
        if (index > -1) {
            document.title = `${name.substr(index)}`;
        } else {
            document.title = `${name}`;
        }
    } else {
        document.title = `*****系统`;
    }

    const defaultOpenKeys = parentKey ? [parentKey] : [];//默认展开的菜单key
    const [openKeys, setOpenKeys] = useState(defaultOpenKeys);//设置打开菜单的key

    function onOpenChange(key) {
        let allKeys = menudata.map((d) => d.key);
        const latestOpenKey = key.find(key => openKeys.indexOf(key) === -1);
        if (allKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(key)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    };

    return (
        <Menu
            key={defaultOpenKeys.join('-')}
            style={{ height: '100%', borderRight: 0 }}
            openKeys={openKeys}
            selectedKeys={path ? [path] : []}
            onOpenChange={onOpenChange}
            mode="inline">
            {render(menudata, history)}
        </Menu>
    );
}

const render = (data, history) => {
    return data.map(({ name, icon, path, count, children, type }, index) =>
        children && children.length ? (
            <SubMenu
                key={path}
                title={
                    <span>
                        <Icon type={icon || 'setting'} />
                        <span>{name}</span>
                    </span>
                }>
                {render(children, history)}
            </SubMenu>
        ) : (
                <Item
                    key={path}
                    title={name}
                    onClick={() => {
                        if (type == 'open') {
                            window.open(path);
                        } else {
                            history.replace(path);
                        }
                    }}>
                    {Boolean(icon) && <Icon type={icon} />}
                    {Boolean(name) && <span>{name}</span>} <Badge count={count} />
                </Item>
            )
    );
};

const find = (data, full, pathname = { path: '', name: '' }) =>
    data.reduce((pn, { path, name, parentKey, children }) => {
        if (children && children.length) {
            return find(children, full, pn);
        }
        if (
            path.length > pn.path.length &&
            full.replace(/\/\d+/g, '').startsWith(path.replace(/\/\d+/g, ''))
        ) {
            return { path, name, parentKey };
        }
        return pn;
    }, pathname);

