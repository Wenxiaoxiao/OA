import React, { Component } from 'react';
import { Table, Tag, Input, Tabs, Radio, Button } from 'antd';

const columns = [
    {
        title: '问卷名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
    },
    {
        title: '问卷内容',
        dataIndex: 'content',
        key: 'content'
    },
    {
        title: '问卷反馈数',
        dataIndex: 'feedbackNum',
        key: 'feedbackNum',
        render: text => <a>{text}</a>,
    }
];
const data = [
    {
        key: '1',
        name: '用户体验调查',
        createTime: '2020/10/08 12:00:00',
        content: '操作改进的地方？',
        feedbackNum: 100
    }
];

const columns1 = [
    {
        title: '渠道',
        dataIndex: 'channel',
        key: 'channel',
        render: text => <a>{text}</a>,
    },
    {
        title: '投入',
        dataIndex: 'input',
        key: 'input'
    },
    {
        title: '投入时间',
        dataIndex: 'inputTime',
        key: 'inputTime'
    },
    {
        title: 'H5链接',
        dataIndex: 'H5Link',
        key: 'H5Link',
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: tags => (
            <Tag color={'volcano'} key={'status'}>
                {tags}
            </Tag>
        ),
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <div className="action">
                <Tag color={'green'} key={'open'}>启用</Tag>
                <Tag color={'geekblue'} key={'close'}>关闭</Tag>
                <Tag color={'red'} key={'edit'}>编辑</Tag>
            </div>
        ),
    },
];

const data1 = [
    {
        key: '1',
        channel: '今日头条',
        status: '启用',
        input: 10000,
        H5Link: 'www.baidu.com',
        inputTime: '2020/10/07 12:00:01'
    },
    {
        key: '2',
        channel: '微信',
        status: '启用',
        input: 20000,
        H5Link: 'www.baidu.com',
        inputTime: '2020/10/07 12:00:01'
    }
];
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
                <Tag color={'red'} key={'edit'}>编辑</Tag>
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
                    <div className="title">问卷调查设置(点击问卷反馈数，弹出问卷反馈列表)</div>
                    <Button type="primary" className="my-btn">新增</Button>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">推广渠道列表</div>
                    <Button type="primary" className="my-btn">新增</Button>
                    <Table columns={columns1} dataSource={data1} className="team-table" />
                </div>
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
