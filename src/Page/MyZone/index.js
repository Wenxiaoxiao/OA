import React, { Component } from 'react';
import { Table, Tag } from 'antd';
const columns = [
    {
        title: '标题',
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
        title: '作者',
        dataIndex: 'writer',
        key: 'writer',
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
                <Tag color={'green'} key={'watch'}>查看</Tag>
                <Tag color={'green'} key={'assign'}>指派</Tag>
                <Tag color={'blue'} key={'editcheck'}>编辑并审核</Tag>
                <Tag color={'volcano'} key={'delete'}>删除</Tag>
            </div>
        ),
    },
];

const data = [
    {
        key: '1',
        title: '室内花卉种植',
        status: '待审核',
        writer: '一只风筝',
        createTime: '2020/10/07 12:00:01'
    },
    {
        key: '2',
        title: '室内花卉种植',
        status: '待审核',
        writer: '往事如烟',
        createTime: '2020/10/07 12:00:01'
    },
    {
        key: '3',
        title: '室内花卉种植',
        status: '待审核',
        writer: '最美的不是下雨天',
        createTime: '2020/10/07 12:00:01'
    },
];

class MyZone extends Component {
    state = {
        loading: false,
    }



    render() {
        return (
            <div className="Index-wrapper">
                <div className="chart2">
                    <div className="title">我的待审核——笔记</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">我的待审核——散文</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">我的待审核——问答</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
            </div>
        );
    }
}

export default MyZone;
