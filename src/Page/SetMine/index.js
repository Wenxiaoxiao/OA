import React, { Component } from 'react';
import { Table, Tag, Input, Tabs, Radio, Button, Switch } from 'antd';
const columns1 = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
    },
    {
        title: '图标',
        dataIndex: 'IconUrl',
        key: 'IconUrl',
        render: (text, record) => (
            <img src={text} className="imgSmall" />
        )
    },
    {
        title: 'App链接',
        dataIndex: 'AppLink',
        key: 'AppLink',
    },
    {
        title: 'H5链接',
        dataIndex: 'H5Link',
        key: 'H5Link',
    },
    {
        title: 'PC链接',
        dataIndex: 'PCLink',
        key: 'PCLink',
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
        title: '我的收藏',
        status: '启用',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
    {
        key: '2',
        title: '我的点赞',
        status: '启用',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
    {
        key: '3',
        title: '我的足迹',
        status: '关闭',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
    {
        key: '4',
        title: '我的关注',
        status: '关闭',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
    {
        key: '5',
        title: '我的发表',
        status: '关闭',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
    {
        key: '6',
        title: '粉丝列表',
        status: '关闭',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
    {
        key: '7',
        title: '我的私信',
        status: '关闭',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
    {
        key: '8',
        title: '我的收入',
        status: '关闭',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    }
];

const { Search } = Input;
const { TabPane } = Tabs;
const { TextArea } = Input;
class SetMine extends Component {
    state = { size: 'small', defaultRule: '一篇笔记+3，一篇散文+5，回答问题+1；', defaultRule1: '签到规则' };

    onChange = e => {
        this.setState({ size: e.target.value });
    };


    render() {
        const { size, defaultRule, defaultRule1 } = this.state;
        return (
            <div className="Index-wrapper">
                <div className="chart2">
                    私信功能 <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                </div>
                <div className="chart2">
                    <div className="title">贡献值规则配置</div>
                    <TextArea rows={4} value={defaultRule} className="my-textarea" /><Button type="primary">保存</Button>
                </div>
                <div className="chart2">
                    <div className="title">签到规则配置</div>
                    <TextArea rows={4} value={defaultRule1} className="my-textarea" /><Button type="primary">保存</Button>
                </div>
                <div className="chart2">
                    <div className="title">个人中心导航配置</div>
                    <Button type="primary" className="my-btn">新增</Button>
                    <Table columns={columns1} dataSource={data1} className="team-table" />
                </div>
            </div>
        );
    }
}

export default SetMine;
