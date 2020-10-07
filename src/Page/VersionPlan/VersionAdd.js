import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Breadcrumb, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
const { Content } = Layout;
const { TextArea } = Input;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};
const selectdata = [{ code: "01", name: "项目管理系统" },{ code: "流通ERP_Code", name: "流通ERP" }, { code: "生产ERP_Code", name: "生产ERP" }, { code: "主数据_Code", name: "主数据" }];
const dateFormat = 'YYYY-MM-DD';
class VersionAdd extends Component {
    constructor(props) {
        super(props); 
        this.state = {             
            belongsProduct: "生产ERP_Code",
            predicHours: 100,
            versionDescribe: "测试描述",
            versionEndDate: "2018-10-20",
            versionStartDate: "2018-10-01",
            versionName: "测试版本名称",
        };
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handlerGoBlack = this.handlerGoBlack.bind(this);
    }
    handlerSubmit(event) {
        event.preventDefault();       
        console.log(this.state);
    }
    handlerGoBlack(event) {
        this.props.history.push("/Main/VersionPlan");
    }
    handlerFromOnchange(name, event) { 
        var newState = {};
        if ("belongsProduct" === name)
        { 
            newState[name] = event ;
        }
        else  if ("versionStartDate" === name || "versionEndDate" === name)
        {  
            newState[name] = event.format("YYYY-MM-DD");
        }else 
        { 
            newState[name] = event.target.value;
        }
        this.setState(newState);
    }
    render() {
        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0', fontWeight: 'bold' }}>
                    <Breadcrumb.Item style={{ color: '#cf1322' }}>版本计划</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    创建版本计划
                     <hr />
                    <Form onSubmit={this.handlerSubmit}>
                        <FormItem label="所属产品" {...formItemLayout}>
                            <Select id="belongsProduct" name="belongsProduct" value={this.state.belongsProduct} onChange={this.handlerFromOnchange.bind(this, "belongsProduct")} >
                                {selectdata.map((item, i) => <Select.Option key={item.code}  value={item.code}>{item.name}</Select.Option>)}
                            </Select>
                        </FormItem>
                        <FormItem label="版本名称" {...formItemLayout}>
                            <Input type="text" id="versionName" name="versionName" value={this.state.versionName} onChange={this.handlerFromOnchange.bind(this, "versionName")} /> （上次计划：{"版本计划名称"}）
                            </FormItem>
                        <FormItem label="开始时间" {...formItemLayout}>
                            <DatePicker id="versionStartDate" name="versionStartDate" format={dateFormat} value={moment(this.state.versionStartDate, dateFormat) } onChange={this.handlerFromOnchange.bind(this, "versionStartDate")} />
                        </FormItem>
                        <FormItem label="结束时间" {...formItemLayout}>
                            <DatePicker id="versionEndDate" name="versionEndDate"  format={dateFormat} value={moment(this.state.versionEndDate, dateFormat)} onChange={this.handlerFromOnchange.bind(this, "versionEndDate")} />
                        </FormItem>
                        <FormItem label="预估总工时(小时)" {...formItemLayout}>
                            <InputNumber id="predicHours" name="predicHours" min={0} value={this.state.predicHours} onChange={this.handlerFromOnchange.bind(this, "predicHours")} />
                        </FormItem>
                        <FormItem label="描述" {...formItemLayout}>
                            <TextArea id="versionDescribe" name="versionDescribe" rows={4} 
                            value={this.state.versionDescribe} 
                            onChange={this.handlerFromOnchange.bind(this, "versionDescribe")} />
                        </FormItem>
                        <FormItem style={{ marginLeft: 100 }} label=""  {...formTailLayout}>
                            <Button type="primary" htmlType="submit">保存</Button>
                            <Button onClick={this.handlerGoBlack} style={{ marginLeft: 30 }} >返回</Button>
                        </FormItem>
                    </Form>
                </div>
            </Content>
        );
    }
}
export default withRouter(VersionAdd);