import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,Link,Switch
} from 'react-router-dom';
import { Breadcrumb,Layout,Icon,Input} from 'antd';
import './index.css';
import Api from '../../Base/api';
import Fetch from'../../Base/base';
import Common  from'../../Base/common';
import MyTable from './MyTable'
const { Content, Header, Sider, Footer} = Layout;
const {TextArea} = Input;
class MyZoneNeed extends Component { 
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
    },]
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
  
  componentDidMount() {
    Fetch('http://127.0.0.1:8080/demand.json',{},{method: 'GET'}).then((responseData) => {
      console.log('接口回来的数据：')
      console.log(responseData)
      this.setState({
        demandData: responseData.data
      })
    })
  }
  render() {
    const {demandColumns,demandData} = this.state;
    return (
      <Content style={{ padding: '0 50px' }}>
      <Breadcrumb separator="" style={{ margin: '16px 0' }}>
        <Breadcrumb.Item ><Icon type="user" style={{margin:'0 10px 0'}} />文小芳 ></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main" className="ant-breadcrumb-item-link" >首页</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneTask" className="ant-breadcrumb-item-link" >任务</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneBug" className="ant-breadcrumb-item-link">BUG</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneDemandCard" className="ant-breadcrumb-item-link">需求卡片</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneDemand" style={{color:'#40a9ff',fontWeight: 'bold'}} >需求</Link></Breadcrumb.Item>
      </Breadcrumb>
      <MyTable tabDescription={'指派给我的卡片'} columns={demandColumns} dataSource={demandData}/> 
    </Content>
    );
  }
}
export default MyZoneNeed;