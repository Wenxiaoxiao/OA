import React, { Component } from 'react';
import { Table, Tag, Input, Tabs, Radio } from 'antd';

const columns2 = [
    {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: '关注',
        dataIndex: 'attention',
        key: 'attention',
        render: text => <a>{text}</a>,
    },
    {
        title: '粉丝',
        dataIndex: 'fans',
        key: 'fans',
        render: text => <a>{text}</a>,
    },
    {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
    },
    {
        title: '注册时间',
        dataIndex: 'createTime',
        key: 'createTime',
    },
    {
        title: '浏览量',
        dataIndex: 'watchSum',
        key: 'watchSum',
    },
    {
        title: '点赞量',
        dataIndex: 'likeSum',
        key: 'likeSum',
    },
    {
        title: '收藏量',
        dataIndex: 'collectSum',
        key: 'collectSum',
    },
    {
        title: "发表散文",
        dataIndex: 'article',
        key: 'article',
    },
    {
        title: "发表笔记",
        dataIndex: 'note',
        key: 'note',
    },
    {
        title: "发表答案",
        dataIndex: 'answer',
        key: 'answer',
    },
    {
        title: "收入",
        dataIndex: 'income',
        key: 'income',
    },
    {
        title: "贡献值",
        dataIndex: 'contribution',
        key: 'contribution',
    },
    {
        title: '个人标签',
        dataIndex: 'tags',
        key: 'tags',
        render: tags => (
            <div>
                {tags.map(tag => {
                    let color = 'green';
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </div>
        ),
    },
    {
        title: '最近一次登录',
        key: 'latestlogin',
        dataIndex: 'latestlogin',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <div className="action">
                <Tag color={'green'} key={'watch'}>查看</Tag>
                <Tag color={'volcano'} key={'delete'}>删除</Tag>
                <Tag color={'blue'} key={'resetpassword'}>重置密码</Tag>
            </div >
        ),
    },
];

const data2 = [
    {
        key: '1',
        name: '十年',
        attention: 120,
        fans: 1000,
        phone: 12345678901,
        password: '111111',
        status: '已上线',
        createTime: '2020/10/07 12:00:01',
        watchSum: 1000,
        likeSum: 120,
        collectSum: 100,
        article: 10,
        note: 3,
        answer: 102,
        tags: ['可爱', '励志'],
        income: 0,
        contribution: 10,
        latestlogin: '2020/10/07 12:30:01'
    },
    {
        key: '2',
        name: 'ten年',
        attention: 0,
        fans: 0,
        phone: 12345678901,
        password: '111111',
        status: '已上线',
        createTime: '2020/10/07 12:00:01',
        watchSum: 1000,
        likeSum: 120,
        collectSum: 100,
        article: 10,
        note: 3,
        answer: 102,
        tags: ['可爱', '励志'],
        income: 10000,
        contribution: 1000,
        latestlogin: '2020/10/07 12:30:01'
    },
    {
        key: '3',
        name: '尚山',
        phone: 12345678901,
        password: '111111',
        status: '已上线',
        createTime: '2020/10/07 12:00:01',
        watchSum: 1000,
        likeSum: 120,
        collectSum: 100,
        article: 10,
        note: 3,
        answer: 102,
        tags: ['可爱', '励志'],
        income: 100,
        contribution: 50,
        latestlogin: '2020/10/07 12:30:01'
    },
];
const { Search } = Input;
const { TabPane } = Tabs;
class UserList extends Component {
    state = { size: 'small' };

    onChange = e => {
        this.setState({ size: e.target.value });
    };


    render() {
        const { size } = this.state;
        return (
            <div className="Index-wrapper">
                <div className="chart2">
                    <div className="title">用户列表(点击用户名，进入用户详情,关注弹出关注列表，粉丝弹出粉丝列表)</div>
                    <Search placeholder="输入作者名" onSearch={value => console.log(value)} enterButton className="my-search" />
                    <Table columns={columns2} dataSource={data2} className="team-table" />
                </div>
            </div>
        );
    }
}

export default UserList;
