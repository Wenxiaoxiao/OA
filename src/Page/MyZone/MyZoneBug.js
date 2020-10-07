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
import MyTable from './MyTable';
const { Content, Header, Sider, Footer} = Layout;
const {TextArea} = Input;
class MyZoneBug extends Component {
  TitleClick= (text, e) => {
    alert(text)
    console.log('click ', e);
    
    // this.setState({ current: e.key,});
    let path = {
      pathname: '/Main/Test',
      query: {
        id: text
      }
    }
    this.props.history.push(path);
  }
    
  state = {
    loading: false,
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
    bugData:[],
  }
  componentDidMount() {
    // bug列表接口
    Fetch('http://127.0.0.1:8080/bug.json',{},{method: 'GET'}).then((responseData) => {
      console.log('接口回来的数据：')
      console.log(responseData)
      this.setState({
        bugData: responseData.data
      })
    })
  }
  render() {
    const {bugColumns,bugData} = this.state;
    return (
      <Content style={{ padding: '0 50px' }}>
      <Breadcrumb separator="" style={{ margin: '16px 0' }}>
        <Breadcrumb.Item ><Icon type="user" style={{margin:'0 10px 0'}} />文小芳 ></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main" className="ant-breadcrumb-item-link" >首页</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneTask" className="ant-breadcrumb-item-link" >任务</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneBug" style={{color:'#40a9ff',fontWeight: 'bold'}}>BUG</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneDemandCard" className="ant-breadcrumb-item-link">需求卡片</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Main/MyZoneDemand" className="ant-breadcrumb-item-link">需求</Link></Breadcrumb.Item>
      </Breadcrumb>
      <MyTable tabDescription={'指派给我的BUG'} columns={bugColumns} dataSource={bugData}/> 
    </Content>
    );
  }
}
export default MyZoneBug;