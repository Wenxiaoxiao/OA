import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import './index.css';
import Fetch from '../../Base/base';
import Common from '../../Base/common';
import {
  HashRouter as Router,
  Route, Link, Switch
} from 'react-router-dom';
import Index from '../Index';
import MyZone from '../MyZone';



const { Header } = Layout;
const SubMenu = Menu.SubMenu;

class Main extends Component {

  state = {
    current: 'Main',
    menuList: [],
    Aauthority: 1,//用户权限 1超级管理员 0 管理员
  }


  componentDidMount() {
    console.log(this.props)
    this.getmenuall();
    this.Aauthority(this.props);
  }

  componentWillUpdate(nextProps) {
    console.log(nextProps)
    this.Aauthority(nextProps);
  }

  Aauthority = (props) => {


  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({ current: e.key, });
    this.props.history.push("/" + e.key);

  }

  TitleClick = (e) => {
    console.log('click ', e);

    this.setState({ current: e.key, });
    this.props.history.push("/" + e.key);
  }

  urlArr = {
    'Main': ['/Main', '/Main/MyZoneTask', '/Main/MyZoneBug', '/Main/MyZoneDemand', '/Main/MyZoneDemandCard'],
    'Main/Index': ['/Main/Index']
  }

  //获取所有权限控制，包括按钮和菜单
  getmenuall = () => {
    let that = this
    // that.setState({ spinloading: true });
    //这里获取权限配置表： //超级管理员 1 普通管理员 0 超级管理员有所有的权限
    let data = [

      {
        "FunctionName": "总览",
        "Url": "Main/Index",
        "Authority": 1
      },
      {
        "FunctionName": "我的地盘",
        "Url": "Main",
        "Authority": 0
      }
    ];
    that.setState({ menuList: data });
    // Fetch('http://127.0.0.1:8080/menulist.json', null, { method: 'GET' }).then((data) => {
    //   console.log(data);
    //   that.setState({ menuList: data });
    // }).catch((error) => {
    //   that.setState({ spinloading: false });
    // });
  }

  // 菜单权限处理
  menuList = () => {
    let menuList = this.state.menuList;
    let Aauthority = this.state.Aauthority;
    console.log(JSON.stringify(menuList));
    if (menuList !== undefined && menuList.length > 0) {
      return (menuList.filter((pItem) => Aauthority === 1 || (pItem.Authority === Aauthority)).map((p) => {
        return (
          <SubMenu onTitleClick={this.TitleClick} key={p.Url} title={<span>{p.FunctionName}</span>} className={this.urlArr[p.Url] && this.urlArr[p.Url].indexOf(this.props.location.pathname) > -1 ? 'ant-menu-item-selected' : ''} ></SubMenu>
        )
      }))
    }
  }


  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[this.state.current]}
            selectedKeys={[this.state.current]}
            style={{ lineHeight: '64px' }}
            onClick={this.handleClick}

          >
            {this.menuList()}
          </Menu>
        </Header>
        <Router>
          <Switch>
            <Route exact path="/Main/Index" component={Index} />
            <Route exact path="/Main" component={MyZone} />
          </Switch>
        </Router>
      </Layout>
    );
  }
}

export default Main;
