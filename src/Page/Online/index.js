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
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <div className="action">
                <Tag color={'red'} key={'buy'}>购买</Tag>
                <Tag color={'blue'} key={'edit'}>编辑</Tag>
                <Tag color={'green'} key={'watch'}>查看</Tag>
                <Tag color={'volcano'} key={'delete'}>删除</Tag>
            </div>
        ),
    },
];

const data = [
    {
        key: '1',
        title: '室内花卉种植1',
        status: '已上线',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07 12:30:01',
        checkStaff: '张三',
        writer: '一只风筝',
        publishStaff: '超级管理员-赵小小',
        publishTime: '2020/10/07 13:30:01'
    },
    {
        key: '2',
        title: '室内花卉种植2',
        status: '已上线',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07 12:30:01',
        checkStaff: '李四',
        writer: '往事如烟',
        publishStaff: '超级管理员-赵小小',
        publishTime: '2020/10/07 13:30:01'
    },
    {
        key: '3',
        title: '室内花卉种植3',
        status: '已上线',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07 12:30:01',
        checkStaff: '张三',
        writer: '最美的不是下雨天',
        publishStaff: '超级管理员-赵大大',
        publishTime: '2020/10/07 13:30:01'
    },
];

class Online extends Component {
    state = {
        loading: false,
    }



    render() {
        return (
            <div className="Index-wrapper">
                <div className="chart2">
                    <div className="title">我的已发布——笔记</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">我的已发布——散文</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">我的已发布——问答</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
            </div>
        );
    }
}

export default Online;
