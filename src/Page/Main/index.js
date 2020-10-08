import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import './index.css';
import Fetch from '../../Base/base';
import Common from '../../Base/common';
import {
  HashRouter as Router,
  Route, Link, Switch
} from 'react-router-dom';
import Index from '../Index';//超级管理员首页总览
import MyZone from '../MyZone';//待审核 所有成员都有 待审核任务由超级管理员分配给其他管理员
import Publish from '../Publish';//待发布 发布权限只有超级管理员才有
import Online from '../Online';//已上线
import TrashCan from '../TrashCan';//已删除的
import SetIndex from '../SetIndex';//首页页面配置
import SetNote from '../SetNote';//笔记页面配置
import SetArticle from '../SetArticle';//散文页面配置
import QusAnswer from '../QusAnswer';//问答页面配置
import SetMine from '../SetMine';//我的页面配置
import UserList from '../UserList';//用户列表
import Activities from '../Activities';//活动配置
import HaveBuy from '../HaveBuy';//已购买内容，内容顶部或底部加上对应的公众号二维码

import Touxiang from '../../images/1.jpg';

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
    'Main': ['/Main'],
    'Main/Index': ['/Main/Index'],
    'Main/Publish': ['/Main/Publish'],
    'Main/Online': ['/Main/Online'],
    'Main/TrashCan': ['/Main/TrashCan'],
    'Main/SetIndex': ['/Main/SetIndex'],
    'Main/SetNote': ['/Main/SetNote'],
    'Main/SetArticle': ['/Main/SetArticle'],
    'Main/QusAnswer': ['/Main/QusAnswer'],
    'Main/SetMine': ['/Main/SetMine'],
    'Main/UserList': ['/Main/UserList'],
    'Main/Activities': ['/Main/Activities'],
    'Main/HaveBuy': ['/Main/HaveBuy']
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
        "FunctionName": "待审核",
        "Url": "Main",
        "Authority": 0,
      },
      {
        "FunctionName": "待发布",
        "Url": "Main/Publish",
        "Authority": 1,
      },
      {
        "FunctionName": "已上线",
        "Url": "Main/Online",
        "Authority": 0,
      },
      {
        "FunctionName": "已删除",
        "Url": "Main/TrashCan",
        "Authority": 1,
      },
      {
        "FunctionName": "首页",
        "Url": "Main/SetIndex",
        "Authority": 1,
      },
      {
        "FunctionName": "笔记",
        "Url": "Main/SetNote",
        "Authority": 1,
      },
      {
        "FunctionName": "散文",
        "Url": "Main/SetArticle",
        "Authority": 1,
      },
      {
        "FunctionName": "问答",
        "Url": "Main/QusAnswer",
        "Authority": 1,
      },
      {
        "FunctionName": "我的",
        "Url": "Main/SetMine",
        "Authority": 1,
      },
      {
        "FunctionName": "用户列表",
        "Url": "Main/UserList",
        "Authority": 1,
      },
      {
        "FunctionName": "活动配置",
        "Url": "Main/Activities",
        "Authority": 1,
      },
      {
        "FunctionName": "已购内容",
        "Url": "Main/HaveBuy",
        "Authority": 1,
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
        <Header className="my-header">
          <img src={Touxiang} className="touxiang" />
          <span className="userName">张三</span>
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
            <Route exact path="/Main/Publish" component={Publish} />
            <Route exact path="/Main/Online" component={Online} />
            <Route exact path="/Main/TrashCan" component={TrashCan} />
            <Route exact path="/Main/SetArticle" component={SetArticle} />
            <Route exact path="/Main/QusAnswer" component={QusAnswer} />
            <Route exact path="/Main/SetIndex" component={SetIndex} />
            <Route exact path="/Main/SetMine" component={SetMine} />
            <Route exact path="/Main/SetNote" component={SetNote} />
            <Route exact path="/Main/UserList" component={UserList} />
            <Route exact path="/Main/Activities" component={Activities} />
            <Route exact path="/Main/HaveBuy" component={HaveBuy} />
          </Switch>
        </Router>
      </Layout>
    );
  }
}

export default Main;
