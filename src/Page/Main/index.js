import React, { Component } from 'react';
import { Layout, Menu,Icon } from 'antd';
import './index.css';
import Fetch from '../../Base/base';
import Common from '../../Base/common';
import {
  HashRouter as Router,
  Route,Link,Switch
} from 'react-router-dom';
import MyZone from '../MyZone';
import MyZoneTask from '../MyZone/MyZoneTask';
import MyZoneDemand from '../MyZone/MyZoneDemand';
import MyZoneDemandCard from '../MyZone/MyZoneDemandCard';
import MyZoneBug from '../MyZone/MyZoneBug';
import Demand from '../Demand';
import Test from '../Test';
import Task from '../Task';
import VersionPlan from '../VersionPlan';
import Product from '../Product';
import Project from '../Project';
import Feedback from '../Feedback';
import BasicData from '../BasicData';
import Calendars from '../BasicData/Calendars';
import Htmldiffs from '../BasicData/Htmldiffs';
import DictitemList from '../BasicData/DictitemList';
import VersionAdd from '../VersionPlan/VersionAdd';
import Documents from '../Documents';


const { Header } = Layout;
const SubMenu = Menu.SubMenu;

class Main extends Component {

  state = {
    current: 'Main',
    menuList:[],
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
    this.setState({current: e.key, });
    this.props.history.push("/"+e.key);

  }

  TitleClick= (e) => {
    console.log('click ', e);

    this.setState({ current: e.key,});
    this.props.history.push("/"+e.key);
  }

  urlArr = {
    'Main': ['/Main', '/Main/MyZoneTask', '/Main/MyZoneBug', '/Main/MyZoneDemand', '/Main/MyZoneDemandCard'],
    'Main/Test': ['/Main/Test'],
    'Main/Product': ['/Main/Product'],
    'Main/Project': ['/Main/Project'],
    'Main/BasicData': ['/Main/BasicData', '/Main/BasicData/Calendars','/Main/BasicData/Htmldiffs','/Main/BasicData/DictitemList'],
    'Main/Documents':['/Main/Documents']
  }

  //获取所有权限控制，包括按钮和菜单
  getmenuall = () =>{
    let that = this
    that.setState({spinloading:true});
    Fetch('http://127.0.0.1:8080/menulist.json', null, { method: 'GET' }).then((data) => {
      console.log(data);
      that.setState({menuList:data});
    }).catch((error) => {
      that.setState({spinloading:false});
    });
  }

    // 菜单权限处理
    menuList = () => {
      let menuList = this.state.menuList;
      // console.log(JSON.stringify(menuList));
      if (menuList !== undefined && menuList.length > 0) {
        return (menuList.filter((pItem) => pItem.ResourceType === 'menu' && pItem.ParentID === '0').map((p) => {
  
          if (p.FunctionName === '项目') {
            return (
              <SubMenu onTitleClick={this.TitleClick} key={p.Url} title={<span>{p.FunctionName}</span>} className={this.urlArr[p.Url] && this.urlArr[p.Url].indexOf(this.props.location.pathname) > -1 ? 'ant-menu-item-selected' : ''} ></SubMenu>
            )
          }
          if (p.FunctionName === '产品') {
            return (
              <SubMenu onTitleClick={this.TitleClick} key={p.Url} title={<span>{p.FunctionName}</span>} className={this.urlArr[p.Url] && this.urlArr[p.Url].indexOf(this.props.location.pathname) > -1 ? 'ant-menu-item-selected' : ''} ></SubMenu>
            )
          }
          else {
            return (
              <SubMenu onTitleClick={this.TitleClick} key={p.Url} className={this.urlArr[p.Url] && this.urlArr[p.Url].indexOf(this.props.location.pathname) > -1 ? 'ant-menu-item-selected' : ''} title={<span>{p.FunctionName}</span>} >
                {
                  menuList.filter((cItem) => cItem.ResourceType === 'menu' && cItem.ParentID == p.Id).map((c) => {
                    return (
                      <Menu.Item key={c.Url} >{c.FunctionName}</Menu.Item>
                    )
                  })
                }
              </SubMenu>
            )
          }
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
            {/* <SubMenu   onTitleClick={this.TitleClick}  key="Main"   title={<span><Icon type="appstore" />我的地盘</span>} >
              <Menu.Item key="Main">首页</Menu.Item>
              <Menu.Item key="Main/MyZoneTask">任务</Menu.Item>
              <Menu.Item key="Main/MyZoneBug">BUG</Menu.Item>
              <Menu.Item key="Main/MyZoneDemand">需求</Menu.Item>
            </SubMenu> */}
            {this.menuList()}
             {/* <SubMenu  onTitleClick={this.TitleClick}   key="Main/Demand"  title={<span>需求</span>} >
              <Menu.Item key="Main/Demand" >首页</Menu.Item>
            </SubMenu>

            <SubMenu    onTitleClick={this.TitleClick}    key="Main/Test"  title={<span>测试</span>}   >
              <Menu.Item key="Main/Test" >首页</Menu.Item>
            </SubMenu>

            <SubMenu    onTitleClick={this.TitleClick}   key="Main/Task" title={<span>任务</span>}    >
              <Menu.Item  key="Main/Task">首页</Menu.Item>
            </SubMenu>

            <SubMenu   onTitleClick={this.TitleClick}    key="Main/VersionPlan" title={<span>版本计划</span>}   >
              <Menu.Item  key="Main/VersionPlan">首页</Menu.Item>
            </SubMenu>  

            <SubMenu    onTitleClick={this.TitleClick}  key="Main/Product"  title={<span>产品</span>}   >
              <Menu.Item key="Main/Product">首页</Menu.Item>
            </SubMenu>    

             <SubMenu   onTitleClick={this.TitleClick}   key="Main/Project" title={<span>项目</span>}    >
              <Menu.Item key="Main/Project">首页</Menu.Item>
            </SubMenu>     

             <SubMenu   onTitleClick={this.TitleClick}   key="Main/Feedback"   title={<span>用户反馈</span>}  >
              <Menu.Item key="Main/Feedback" >首页</Menu.Item>
            </SubMenu>      

             <SubMenu   onTitleClick={this.TitleClick}   key="Main/BasicData"  title={<span>基础数据</span>}  >
              <Menu.Item key="Main/BasicData">首页</Menu.Item>
              <Menu.Item key="Main/BasicData/Calendars">日历</Menu.Item>
              <Menu.Item key="Main/BasicData/Htmldiffs">文本对比</Menu.Item>
            </SubMenu>         */}

          </Menu>
      </Header>
         <Router>
          <Switch> 
            <Route exact path="/Main" component={MyZone} />
            <Route exact path="/Main/MyZoneTask" component={MyZoneTask} />    
            <Route path="/Main/MyZoneBug" component={MyZoneBug} />
            <Route path="/Main/MyZoneDemand" component={MyZoneDemand} />         
            <Route path="/Main/MyZoneDemandCard" component={MyZoneDemandCard} />     
            <Route path="/Main/Demand" component={Demand} />
            <Route path="/Main/Test" component={Test} />
            <Route path="/Main/Task" component={Task} />
            <Route exact path="/Main/VersionPlan" component={VersionPlan} />
            <Route path="/Main/Product" component={Product} />
            <Route path="/Main/Project" component={Project} />
            <Route path="/Main/Feedback" component={Feedback} />
            <Route exact path="/Main/BasicData" component={BasicData} />
            <Route exact path="/Main/BasicData/Calendars" component={Calendars} />
            <Route exact path="/Main/BasicData/Htmldiffs" component={Htmldiffs} />
            <Route exact path="/Main/BasicData/DictitemList" component={DictitemList} />
            <Route exact path="/Main/VersionPlan/VersionAdd" component={VersionAdd} />
            <Route path="/Main/Documents" component={Documents} />
          </Switch> 
        </Router>
    </Layout>
    );
  }
}

export default Main;
