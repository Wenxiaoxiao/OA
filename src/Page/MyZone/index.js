import React, { Component } from 'react';
// import { Breadcrumb,Layout} from 'antd';
import {
  HashRouter as Router,
  Route,Link,Switch
} from 'react-router-dom';
import { Breadcrumb,Layout,Icon,Table,Menu, Tabs,Card} from 'antd';
import './index.css';
import Api from '../../Base/api';
import Fetch from'../../Base/base';
import Common  from'../../Base/common';
import MyZoneTask from './MyZoneTask';
import MyZoneBug from './MyZoneBug';
import MyTable from './MyTable';

const { Content } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane= Tabs.TabPane;

class MyZone extends Component {
  state = {
    loading: false,
    // 需求数据
    demandData: [],
    // 需求列描述及字段定义
    demandColumns: [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '需求名称',
      dataIndex: 'name',
      key: 'name',
      render: text => {
        return (<a href="javascript:;" onClick={this.TitleClick.bind(this, text)}>{text}</a>)
      },
    }, {
      title: '预计',
      dataIndex: 'endDate',
      key: 'endDate',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '阶段',
      key: 'stage',
      dataIndex: 'stage',
    },],
    // bug数据
    bugData: [],
    // bug列
    bugColumns:[{
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },{
      title: 'BUG标题',
      dataIndex: 'bugTitle',
      key: 'bugTitle',
      render: text => {
        return (<a href="javascript:;" onClick={this.TitleClick.bind(this, text)}>{text}</a>)
      }
    },{
      title: '级别',
      dataIndex: 'level',
      key: 'level'
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    }],
    // 任务列字段定义
    taskColumns: [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },{
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      redner: text => {
        return (<a href="javascript:;" onClick={this.TitleClick.bind(this, text)}>{text}</a>)
      }
    },{
      title: '预计时间',
      dataIndex: 'preTime',
      key: 'preTime'
    },{
      title: '截止日期',
      dataIndex: 'endDate',
      key: 'endDate'
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    }],
    // 任务列数据
    taskData: []
  }
  componentDidMount() {
    // todo 三个table各自数据的请求是否需要考虑后台的分页？？？，还是一次性请求回来后前端进行分页处理？
    Fetch('http://127.0.0.1:8080/demand.json',{},{method: 'GET'}).then((responseData) => {
      console.log('接口回来的数据：')
      console.log(responseData)
      this.setState({
        demandData: responseData.data
      })
    })
    // bug列表接口
    Fetch('http://127.0.0.1:8080/bug.json',{},{method: 'GET'}).then((responseData) => {
      console.log('接口回来的数据：')
      console.log(responseData)
      this.setState({
        bugData: responseData.data
      })
    })
    // 任务列表接口
    Fetch('http://127.0.0.1:8080/task.json',{},{method: 'GET'}).then((responseData) => {
      console.log('接口回来的数据：')
      console.log(responseData)
      const arr = this.arrDone(responseData.data)
      console.log('修改后的数组：')
      console.log(arr)
      this.setState({
        taskData: responseData.data
      })
    })
  }
  arrDone = (arr) => {
    arr.map(item => {
      item.nameObj = [];
      item.nameObj[0] = item.taskName;
      item.nameObj[1] = item.id
    })
    console.log('arr:'+JSON.stringify(arr))
    return arr
  }
  TitleClick= (text, e) => {
    alert(text)
    console.log('click ', e);
    
    // this.setState({ current: e.key,});
    let path = {
      pathname: '/Main/Demand',
      query: {
        id: text
      }
    }
    this.props.history.push(path);
  }


 

  render() {
    const {demandColumns,demandData,bugColumns,bugData,taskColumns,taskData} = this.state;
    return (
      <Content style={{ padding: '0 50px' }}>
      <Breadcrumb separator="" style={{ margin: '16px 0' }}>
        <Breadcrumb.Item ><Icon type="user" style={{margin:'0 10px 0'}} />文小芳 ></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main" style={{color:'#40a9ff',fontWeight: 'bold'}}>首页</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneTask" className="ant-breadcrumb-item-link">任务</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneBug" className="ant-breadcrumb-item-link">BUG</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneDemandCard" className="ant-breadcrumb-item-link">需求卡片</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneDemanCard" className="ant-breadcrumb-item-link">需求</Link></Breadcrumb.Item>
      </Breadcrumb>
      <MyTable tabDescription={'指派给我的任务'} columns={taskColumns} dataSource={taskData}/> 
      <MyTable tabDescription={'指派给我的bug'} columns={bugColumns} dataSource={bugData}/> 
      <MyTable tabDescription={'指派给我的需求'} columns={demandColumns} dataSource={demandData}/> 
      <MyTable tabDescription={'指派给我的需求卡片'} columns={bugColumns} dataSource={bugData}/> 
    </Content>
    );
  }
}

export default MyZone;
