/*
 * @Description: t 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2020-05-07 09:09:18
 * @LastEditors: Seven
 * @LastEditTime: 2020-09-23 14:17:42
 */
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Menu from './pages/menu/menu';
import Header from './components/common/HeadView';

import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { createHashHistory } from 'history';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import { Layout } from 'antd';

// 处理浏览器兼容
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// 引进页面（pages）
import Index from './pages/Index';
import Login from './pages/login/login';
import TempMgt from './pages/temp/tempMgt';
import TempDetail from './pages/temp/tempDetail';

const { Content } = Layout;
const history = createHashHistory();

class RouteDom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getJwtLogin: true, //是否登录凭证
    };
  }
  componentDidMount() {}

  render() {
    const { getJwtLogin } = this.state;
    return (
      <ConfigProvider locale={zh_CN}>
        {getJwtLogin && (
          <Router history={history}>
            <Layout className="h-100">
              <Switch>
                <Route path="/login" component={null} />
                <Route component={Menu} />
              </Switch>
              <Layout>
                <Switch>
                  <Route path="/login" component={null} />
                  <Route component={Header} />
                </Switch>
                <Content>
                  <Switch>
                    <Route path="/temp/tempTableMgt/detail/:id" component={TempDetail}/>
                    <Route path="/temp/tempTableMgt" component={TempMgt}/>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Index} />
                    <Redirect to="/" component={Index} />
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </Router>
        )}
      </ConfigProvider>
    );
  }
}

ReactDOM.render(<RouteDom></RouteDom>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
