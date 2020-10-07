import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,Link,Switch
} from 'react-router-dom';
import { Breadcrumb,Layout,Icon,Table,Menu, Tabs,Card} from 'antd';
import './index.css';
import Api from '../../Base/api';
import Fetch from'../../Base/base';
import Common  from'../../Base/common';
// 表格组件
class MyTable extends Component {
    state = {
      // 表格内容描述
      tabDescription: '',
      // 表列描述
      columns: [],
      // 表数据
      data: [],
    }
  
    componentDidMount() {
      console.log(" 测试："+JSON.stringify(this.props.dataSource))   
    }
  
    render() {
      let {tabDescription,columns,dataSource} = this.props;
      return (
        <Card title={tabDescription} style={{ background: '#fff', padding: 24}}>
          <Table pagination={{pageSize:5,pageSizeOptions:['5','10','15','20']}} columns={columns} dataSource={dataSource} bordered={true}/>
        </Card>
      )
    }
  }
  export default MyTable;