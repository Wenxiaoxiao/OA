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
        title: '删除原因',
        key: 'reason',
        dataIndex: 'reason'
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <div className="action">
                <Tag color={'green'} key={'watch'}>查看</Tag>
                <Tag color={'volcano'} key={'delete'}>彻底删除</Tag>
                <Tag color={'blue'} key={'restore'}>恢复为待审核</Tag>
            </div>
        ),
    },
];

const data = [
    {
        key: '1',
        title: '室内花卉种植4',
        status: '已删除',
        reason: '内容已过时',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07 12:30:01',
        checkStaff: '张三',
        writer: '一只风筝',
        publishStaff: '超级管理员-赵小小',
        publishTime: '2020/10/07 13:30:01'
    },
    {
        key: '2',
        title: '室内花卉种植5',
        status: '已删除',
        reason: '内容已过时',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07 12:30:01',
        checkStaff: '李四',
        writer: '往事如烟',
        publishStaff: null,
        publishTime: null
    },
    {
        key: '3',
        title: '室内花卉种植6',
        status: '已删除',
        reason: '内容不符合价值观',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07 12:30:01',
        checkStaff: '张三',
        writer: '最美的不是下雨天',
        publishStaff: '超级管理员-赵大大',
        publishTime: '2020/10/07 13:30:01'
    },
];

class TrashCan extends Component {
    state = {
        loading: false,
    }



    render() {
        return (
            <div className="Index-wrapper">
                <div className="chart2">
                    <div className="title">我的已删除——笔记</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">我的已删除——散文</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">我的已删除——问答</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
            </div>
        );
    }
}

export default TrashCan;
