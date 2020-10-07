import React, { Component } from 'react';
import { Table, Tag, Input, Tabs, Radio } from 'antd';
const columns2 = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '已购',
        dataIndex: 'hasbuy',
        key: 'hasbuy',
    },
    {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
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
        title: '二维码',
        dataIndex: 'qrcode',
        key: 'qrcode',
        render: text => <img src={text} className="qrcode" />
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
                <Tag color={'red'} key={'edit'}>编辑</Tag>
                <Tag color={'green'} key={'watch'}>查看</Tag>
                <Tag color={'volcano'} key={'delete'}>删除</Tag>
            </div>
        ),
    },
];

const data2 = [
    {
        key: '1',
        title: '我的...',
        status: '已上线',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07...',
        checkStaff: '张三',
        writer: '一只',
        publishStaff: '赵小小',
        publishTime: '2020/10/07...',
        watchSum: 10,
        likeSum: 12,
        collectSum: 10,
        qrcode: 'http://devoutact.top/OA/src/images/qrcode.jpg',
        tags: ['可爱', '励志'],
        type: '散文',
        hasbuy: '是',
        amount: 10
    },
    {
        key: '2',
        title: '室内花...',
        status: '已上线',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07...',
        checkStaff: '李四',
        writer: '往事',
        publishStaff: '赵小小',
        publishTime: '2020/10/07...',
        watchSum: 10,
        likeSum: 12,
        collectSum: 11,
        qrcode: 'http://devoutact.top/OA/src/images/qrcode.jpg',
        tags: ['可爱', '励志'],
        type: '笔记',
        hasbuy: '是',
        amount: 1
    },
    {
        key: '3',
        title: '升职加薪...',
        status: '已上线',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07...',
        checkStaff: '张三',
        writer: '最美',
        publishStaff: '赵大大',
        publishTime: '2020/10/07...',
        watchSum: 10,
        likeSum: 12,
        collectSum: 10,
        qrcode: 'http://devoutact.top/OA/src/images/qrcode.jpg',
        tags: ['励志'],
        type: '问答',
        hasbuy: '是',
        amount: 10
    },
];
const { Search } = Input;
const { TabPane } = Tabs;
class HaveBuy extends Component {
    state = { size: 'small' };

    onChange = e => {
        this.setState({ size: e.target.value });
    };


    render() {
        const { size } = this.state;
        return (
            <div className="Index-wrapper">
                <div className="chart2">
                    <div className="title">已购列表</div>
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

export default HaveBuy;
