import React, { Component } from "react"; 
import { Layout, Breadcrumb, Table, Button, Select } from 'antd';
import {withRouter} from 'react-router-dom';
const { Content } = Layout;
const columns = [
  { title: 'ID', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '名称', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '描述', dataIndex: 'address', key: '1' },
  { title: '状态', dataIndex: 'address', key: '2' },
  { title: '开始日期', dataIndex: 'address', key: '3' },
  { title: '结束日期', dataIndex: 'address', key: '4' },
  { title: '预估总工时', dataIndex: 'address', key: '5' },
  { title: '已占用工时', dataIndex: 'address', key: '6' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    // render: () => <a href="javascript:;">action</a>,
  },
];
const selectdata = [{ code: "流通ERP", name: "流通ERP" }, { code: "生产ERP", name: "生产ERP" }, { code: "主数据", name: "主数据" }];

class VersionPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      btnsDefault: 'all'
    };
    this.handlerBtnClick = this.handlerBtnClick.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  handlerBtnClick(event) {
    const ev = event || window.event;
    ev.nativeEvent.stopImmediatePropagation();
     // console.log(event.target.id);
    // console.log(event.nativeEvent);
    if (event.target.id !== "newVersion") {
      this.setState({ btnsDefault: event.target.id });
    } else {
      console.log('2');
      
    }
  }
  handleSelectChange(event) {
    console.log(event);
  }
  handlerNewVersion(name,event)
  {
    console.log(name);
    console.log(this.props);
    this.props.history.push("/Main/VersionPlan/VersionAdd");
  }



  render() {
    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0', fontWeight: 'bold' }}>
          <Breadcrumb.Item style={{ color: '#cf1322' }}>版本计划</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <div>
            <div style={{ float: "left", marginRight: 20 }}>
              <Select defaultValue="流通ERP" style={{ width: 180 }} onChange={this.handleSelectChange}>
                {selectdata.map((item, i) => <Select.Option key={item.code} value={item.code}>{item.name}</Select.Option>)}
              </Select>
            </div>
            <Button.Group>
              <Button id="all" name="all" type={"all" === this.state.btnsDefault ? "primary" : ""} onClick={this.handlerBtnClick}>全部</Button>
              <Button id="haveRelease" name="haveRelease" type={"haveRelease" === this.state.btnsDefault ? "primary" : ""} onClick={this.handlerBtnClick}>已发布</Button>
              <Button id="notRelease" name="notRelease" type={"notRelease" === this.state.btnsDefault ? "primary" : ""} onClick={this.handlerBtnClick}>已发布</Button>
            </Button.Group>
            <div style={{ float: "right" }}>
              <Button id="newVersion" name="newVersion" type="primary"
                onClick={this.handlerNewVersion.bind(this,'newVersion')}>新建版本计划</Button>
            </div>
          </div>
          <div>
            <Table columns={columns}
              // dataSource={data}
              scroll={{ x: 1000 }} />
          </div>   
        </div>
      </Content>
    );
  }
}

export default withRouter(VersionPlan);
