import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,Link,Switch,withRouter
} from 'react-router-dom';
import { Breadcrumb,Layout,Icon,Input} from 'antd';
import './index.css';
import Api from '../../Base/api';
import Fetch from'../../Base/base';
import Common  from'../../Base/common';
import MyTable from './MyTable';

const { Content, Header, Sider, Footer} = Layout;
const {TextArea} = Input;

class MyZoneTask extends Component {
  state = {
    loading: false,
    // 任务列字段定义
    taskColumns: [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },{
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      render: text => {
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
    // 任务列表接口
    // http://127.0.0.1:8080/task.json http://10.4.7.27:8888/api/Assignment/AddAssignment
    Fetch('http://127.0.0.1:8080/task.json',{},{method: 'GET'}).then((responseData) => {
      console.log('接口回来的数据：')
      console.log(responseData)
      this.setState({
        taskData: responseData.data
      })
    })
  }
  TitleClick= (e) => {
    console.log('click ', e);
    // this.setState({ current: e.key,});
    this.props.history.push('/Main/Task');
  }


 

  render() {
    const {taskColumns,taskData} = this.state;
    return (
      <Content style={{ padding: '0 50px' }}>
       <Breadcrumb separator="" style={{ margin: '16px 0' }}>
        <Breadcrumb.Item ><Icon type="user" style={{margin:'0 10px 0'}} />文小芳 ></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main" className="ant-breadcrumb-item-link" >首页</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneTask" style={{color:'#40a9ff',fontWeight: 'bold'}}>任务</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneBug" className="ant-breadcrumb-item-link">BUG</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneDemandCard" className="ant-breadcrumb-item-link">需求卡片</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneDemanCard" className="ant-breadcrumb-item-link">需求</Link></Breadcrumb.Item>
      </Breadcrumb>
      <MyTable tabDescription={'指派给我的卡片'} columns={taskColumns} dataSource={taskData}/> 
    </Content>
    );
  }
}

export default withRouter(MyZoneTask);
