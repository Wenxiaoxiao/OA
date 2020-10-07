import React, { Component } from 'react';
import { Table, Tag, Input, Tabs, Radio } from 'antd';
const columns = [
    {
        title: '主题',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    },
    {
        title: '背景图',
        dataIndex: 'BgUrl',
        key: 'BgUrl',
        render: (text, record) => (
            <img src={text} className="imgSmall" />
        )
    },
    {
        title: '链接',
        dataIndex: 'BgLink',
        key: 'BgLink',
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
                <Tag color={'green'} key={'watch'}>
                    启用
        </Tag>
                <Tag color={'geekblue'} key={'edit'}>
                    关闭
        </Tag>
                <Tag color={'red'} key={'edit'}>
                    编辑
        </Tag>
            </div>
        ),
    },
];

const data = [
    {
        key: '1',
        title: '国庆节活动主题',
        status: '启用',
        createTime: '2020/10/07 12:00:01',
        BgUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        BgLink: 'www.baidu.com'
    },
    {
        key: '2',
        title: '国庆节活动主题',
        status: '启用',
        createTime: '2020/10/07 12:00:01',
        BgUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        BgLink: 'www.baidu.com'
    },
    {
        key: '3',
        title: '国庆节活动主题',
        status: '关闭',
        createTime: '2020/10/07 12:00:01',
        BgUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        BgLink: 'www.baidu.com'
    },
];

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
                <Tag color={'green'} key={'watch'}>
                    启用
        </Tag>
                <Tag color={'geekblue'} key={'edit'}>
                    关闭
        </Tag>
                <Tag color={'red'} key={'edit'}>
                    编辑
        </Tag>
            </div>
        ),
    },
];

const data1 = [
    {
        key: '1',
        title: '活动',
        status: '启用',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
    {
        key: '2',
        title: '签到',
        status: '启用',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
    {
        key: '3',
        title: '今日书签',
        status: '关闭',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    },
    {
        key: '4',
        title: '待办',
        status: '关闭',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        AppLink: 'www.baidu.com',
        H5Link: 'www.baidu.com',
        PCLink: 'www.baidu.com'
    }
];
const columns2 = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
    },
    {
        title: '已购',
        dataIndex: 'hasbuy',
        key: 'hasbuy',
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    },
    {
        title: '审核时间',
        dataIndex: 'checkTime',
        key: 'checkTime',
    },
    {
        title: '审核人',
        dataIndex: 'checkStaff',
        key: 'checkStaff',
    },
    {
        title: '发布时间',
        dataIndex: 'publishTime',
        key: 'publishTime',
    },
    {
        title: '发布人',
        dataIndex: 'publishStaff',
        key: 'publishStaff',
    },
    {
        title: '作者',
        dataIndex: 'writer',
        key: 'writer',
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
        title: '标签',
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
                <Tag color={'green'} key={'watch'}>
                    查看
        </Tag>
                <Tag color={'volcano'} key={'delete'}>
                    删除
        </Tag>
            </div>
        ),
    },
];

const data2 = [
    {
        key: '1',
        title: '我的第一个十年',
        hasbuy: '是',
        status: '已上线',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07 12:30:01',
        checkStaff: '张三',
        writer: '一只风筝',
        publishStaff: '赵小小',
        publishTime: '2020/10/07 13:30:01',
        watchSum: 1000,
        likeSum: 120,
        collectSum: 100,
        tags: ['可爱', '励志'],
        type: '散文'
    },
    {
        key: '2',
        title: '室内花卉种植2',
        status: '已上线',
        hasbuy: '否',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07 12:30:01',
        checkStaff: '李四',
        writer: '往事如烟',
        publishStaff: '赵小小',
        publishTime: '2020/10/07 13:30:01',
        watchSum: 1000,
        likeSum: 120,
        collectSum: 100,
        tags: ['可爱', '励志'],
        type: '笔记'
    },
    {
        key: '3',
        title: '如何快速升职加薪？',
        status: '已上线',
        hasbuy: '是',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07 12:30:01',
        checkStaff: '张三',
        writer: '最美的...',
        publishStaff: '赵大大',
        publishTime: '2020/10/07 13:30:01',
        watchSum: 1000,
        likeSum: 120,
        collectSum: 100,
        tags: ['励志'],
        type: '问答'
    },
];
const { Search } = Input;
const { TabPane } = Tabs;
class SetIndex extends Component {
    state = { size: 'small' };

    onChange = e => {
        this.setState({ size: e.target.value });
    };


    render() {
        const { size } = this.state;
        return (
            <div className="Index-wrapper">
                <div className="chart2">
                    <div className="title">顶部banner配置</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">导航配置</div>
                    <Table columns={columns1} dataSource={data1} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">热门精选</div>
                    <Search placeholder="输入作品名或作者名" onSearch={value => console.log(value)} enterButton className="my-search" />
                    <span className="my-tabs-name">设置页面顺序</span>
                    <Radio.Group value={size} onChange={this.onChange} style={{ marginBottom: 16 }}>
                        <Radio.Button value="small">综合</Radio.Button>
                        <Radio.Button value="small1">浏览量</Radio.Button>
                        <Radio.Button value="default">点赞量</Radio.Button>
                        <Radio.Button value="large">收藏量</Radio.Button>
                    </Radio.Group>
                    <Table columns={columns2} dataSource={data2} className="team-table" />
                </div>
            </div>
        );
    }
}

export default SetIndex;
