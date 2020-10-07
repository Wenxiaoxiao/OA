import React, { Component } from 'react';
import { Table, Tag, Input, Tabs, Radio, Button } from 'antd';
const columns = [
    {
        title: '专栏名',
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
        title: '链接',
        dataIndex: 'Link',
        key: 'Link',
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
        title: '园艺',
        status: '启用',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        Link: 'www.baidu.com'
    },
    {
        key: '2',
        title: '语言',
        status: '启用',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        Link: 'www.baidu.com'
    },
    {
        key: '3',
        title: '职场',
        status: '关闭',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg',
        Link: 'www.baidu.com'
    },
];

const columns1 = [
    {
        title: '模板名',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
    },
    {
        title: '缩略图',
        dataIndex: 'IconUrl',
        key: 'IconUrl',
        render: (text, record) => (
            <img src={text} className="imgSmall" />
        )
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
        title: '空白模板',
        status: '启用',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg'
    },
    {
        key: '2',
        title: '康奈尔笔记模板',
        status: '启用',
        IconUrl: 'https://img.yzcdn.cn/vant/leaf.jpg'
    },
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
        title: '专栏',
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
        type: '语言'
    },
    {
        key: '2',
        title: '室内花卉种植2',
        hasbuy: '是',
        status: '已上线',
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
        type: '园艺'
    },
    {
        key: '3',
        title: '如何快速升职加薪？',
        hasbuy: '是',
        status: '已上线',
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
        type: '职场'
    },
];
const { Search } = Input;
const { TabPane } = Tabs;
class SetNote extends Component {
    state = { size: 'small' };

    onChange = e => {
        this.setState({ size: e.target.value });
    };


    render() {
        const { size } = this.state;
        return (
            <div className="Index-wrapper">
                <div className="chart2">
                    <div className="title">顶部专栏配置(根据专栏显示不同的列表数据)</div>
                    <Button type="primary" className="my-btn">新增</Button>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">笔记模板配置</div>
                    <Button type="primary" className="my-btn">新增</Button>
                    <Table columns={columns1} dataSource={data1} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">笔记列表</div>
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

export default SetNote;
