import React, { Component } from 'react';
import { Layout,Form,DatePicker,Button,TimePicker,Calendar, Select,Divider,Spin } from 'antd';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import Fetch from '../../Base/base'
import { GetApi } from '../../Base/api';
import Htmldiff from '../../Components/Htmldiff/index';
import './Calendars.css';
//import LunarUtil from './LunarUtil';
const { Content, Sider } = Layout;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const { MonthPicker, RangePicker,WeekPicker } = DatePicker;
const { Option } = Select;

class Htmldiffs extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        
    }

    render() {
        return(
            <Content>
                <Htmldiff></Htmldiff>
            </Content>
        )
    }
}

export default Htmldiffs;