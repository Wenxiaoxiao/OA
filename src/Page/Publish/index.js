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
                <Tag color={'green'} key={'watch'}>
                    查看
        </Tag>
                <Tag color={'geekblue'} key={'edit'}>
                    编辑
        </Tag>
                <Tag color={'blue'} key={'check'}>
                    发布
        </Tag>
                <Tag color={'volcano'} key={'delete'}>
                    删除
        </Tag>
            </div>
        ),
    },
];

const data = [
    {
        key: '1',
        title: '室内花卉种植1',
        status: '待发布',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07 12:30:01',
        checkStaff: '张三',
        writer: '一只风筝'
    },
    {
        key: '1',
        title: '室内花卉种植2',
        status: '待发布',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07 12:30:01',
        checkStaff: '李四',
        writer: '往事如烟'
    },
    {
        key: '1',
        title: '室内花卉种植3',
        status: '待发布',
        createTime: '2020/10/07 12:00:01',
        checkTime: '2020/10/07 12:30:01',
        checkStaff: '张三',
        writer: '最美的不是下雨天'
    },
];

class Publish extends Component {
    state = {
        loading: false,
    }



    render() {
        return (
            <div className="Index-wrapper">
                <div className="chart2">
                    <div className="title">我的待发布——笔记</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">我的待发布——散文</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
                <div className="chart2">
                    <div className="title">我的待发布——问答</div>
                    <Table columns={columns} dataSource={data} className="team-table" />
                </div>
            </div>
        );
    }
}

export default Publish;
