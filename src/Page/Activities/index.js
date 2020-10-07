import React, { Component } from 'react';
import { Table, Tag, Input, Tabs, Radio, Button } from 'antd';

const columns2 = [
    {
        title: '活动名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '开始时间',
        dataIndex: 'starttime',
        key: 'starttime'
    },
    {
        title: '结束时间',
        dataIndex: 'endtime',
        key: 'endtime',
    },
    {
        title: '图片',
        dataIndex: 'IconUrl',
        key: 'IconUrl',
        render: text => <img src={text} className="imgSmall" />
    },
    {
        title: 'App链接',
        dataIndex: 'AppLink',
        key: 'AppLink'
    },
    {
        title: 'H5链接',
        dataIndex: 'H5Link',
        key: 'H5Link'
    },
    {
        title: 'PC链接',
        dataIndex: 'PCLink',
        key: 'PCLink'
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <div className="action">
                <Tag color={'green'} key={'open'}>启用</Tag>
                <Tag color={'geekblue'} key={'close'}>关闭</Tag>
                <Tag color={'red'} key={'edit'}></Tag>
            </div >
        ),
    },
];

const data2 = [
    {
        key: '1',
        name: '双十一',
        status: '已上线',
        starttime: '2020/10/07 12:00:01',
        endtime: '2020/10/07 12:30:01',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
    {
        key: '2',
        name: '双十一',
        status: '已上线',
        starttime: '2020/10/07 12:00:01',
        endtime: '2020/10/07 12:30:01',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
    {
        key: '3',
        name: '双十一',
        status: '已上线',
        starttime: '2020/10/07 12:00:01',
        endtime: '2020/10/07 12:30:01',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
];
const columns3 = [
    {
        title: '书签名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '图片',
        dataIndex: 'IconUrl',
        key: 'IconUrl',
        render: text => <img src={text} className="imgSmall" />
    },
    {
        title: '文案',
        dataIndex: 'Copywriting',
        key: 'Copywriting'
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <div className="action">
                <Tag color={'green'} key={'open'}>启用</Tag>
                <Tag color={'geekblue'} key={'close'}>关闭</Tag>
                <Tag color={'red'} key={'edit'}>编辑</Tag>
            </div >
        ),
    },
];

const data3 = [
    {
        key: '1',
        name: '双十一',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        Copywriting: '我是文案我是文案我是文案',
        status: '启用'
    },
    {
        key: '2',
        name: '双十二',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        Copywriting: '我是文案我是文案我是文案',
        status: '启用'
    },
    {
        key: '3',
        name: '中秋节',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        Copywriting: '我是文案我是文案我是文案',
        status: '启用'
    },
];
const { Search } = Input;
const { TabPane } = Tabs;
class Activities extends Component {
    state = { size: 'small' };

    onChange = e => {
        this.setState({ size: e.target.value });
    };


    render() {
        const { size } = this.state;
        return (
            <div className="Index-wrapper">
                <div className="chart2">
                    <div className="title">活动列表</div>
                    <Button type="primary" className="my-btn">新增</Button>
                    <Search placeholder="输入活动名称" onSearch={value => console.log(value)} enterButton className="my-search" />
                    <Table columns={columns2} dataSource={data2} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">每日书签配置(用户签到，随机获得书签背景和文案)</div>
                    <Button type="primary" className="my-btn">新增</Button>
                    <Search placeholder="输入书签名称或文案关键字" onSearch={value => console.log(value)} enterButton className="my-search" />
                    <Table columns={columns3} dataSource={data3} className="team-table" />
                </div>
            </div>
        );
    }
}

export default Activities;
