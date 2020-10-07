import React, { Component } from 'react';
import { Card, Col, Row, Table, Tag, Button } from 'antd';
import './index.scss';
import png1 from '../../images/1.png';
import png2 from '../../images/2.png';
import png3 from '../../images/3.png';
import png4 from '../../images/4.png';
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '权限',
    dataIndex: 'auth',
    key: 'auth',
  },
  {
    title: '图片',
    dataIndex: 'icon',
    key: 'icon',
    render: text => <img src={text} className="my-icon" />
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
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
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <div className="action">
        <Tag color={'geekblue'} key={'edit'}>
          编辑
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
    name: '张三',
    auth: 1,
    address: '湖北省武汉市',
    icon: 'http://devoutact.top/OA/src/images/1.jpg',
    tags: ['细心', '文笔好'],
  },
  {
    key: '2',
    name: '李四',
    auth: 0,
    address: '湖南省长沙市',
    icon: 'http://devoutact.top/OA/src/images/1.jpg',
    tags: ['效率高', ' 积极主动'],
  },
  {
    key: '3',
    name: '王二麻',
    auth: 0,
    address: '北京市',
    icon: 'http://devoutact.top/OA/src/images/1.jpg',
    tags: ['态度好', '认真负责'],
  },
];
class Index extends Component {
  state = {
    loading: false,
  }



  render() {
    return (
      <div className="Index-wrapper">
        <div className="site-card-wrapper">
          <Row gutter={24}>
            <Col span={6}>
              <Card title="总用户数" bordered={false}>1000</Card>
            </Col>
            <Col span={6}>
              <Card title="笔记总数" bordered={false}>1000</Card>
            </Col>
            <Col span={6}>
              <Card title="散文总数" bordered={false}>1234</Card>
            </Col>
            <Col span={6}>
              <Card title="问答总数" bordered={false}>12345</Card>
            </Col>
          </Row>
        </div>
        <div className="site-card-rate">
          <Row gutter={24}>
            <Col span={6}>
              <Card title="今日活跃用户" bordered={false}>100</Card>
            </Col>
            <Col span={6}>
              <Card title="已发布笔记" bordered={false}>100</Card>
            </Col>
            <Col span={6}>
              <Card title="已发布散文" bordered={false}>123</Card>
            </Col>
            <Col span={6}>
              <Card title="已发布问答" bordered={false}>345</Card>
            </Col>
          </Row>
        </div>
        <div className="site-card-still">
          <Row gutter={24}>
            <Col span={6}>
              <Card title="今日获取用户渠道" bordered={false}>
                <span>今日头条:12人</span>&nbsp;|&nbsp;
                <span>微信:10人</span>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="待发布笔记" bordered={false}>100</Card>
            </Col>
            <Col span={6}>
              <Card title="待发布散文" bordered={false}>123</Card>
            </Col>
            <Col span={6}>
              <Card title="待发布问答" bordered={false}>345</Card>
            </Col>
          </Row>
        </div>
        <div className="site-card-still">
          <Row gutter={24}>
            <Col span={6}>
              <Card title="今日渠道费用" bordered={false}>
                <span>今日头条:120元</span>&nbsp;|&nbsp;
                <span>微信:12元</span>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="待审核笔记" bordered={false}>100</Card>
            </Col>
            <Col span={6}>
              <Card title="待审核散文" bordered={false}>123</Card>
            </Col>
            <Col span={6}>
              <Card title="待审核问答" bordered={false}>345</Card>
            </Col>
          </Row>
        </div>
        <div className="chart1">
          <div className="title">笔记/散文/问答数统计</div>
          <img src={png1} />
        </div>
        <div className="chart2">
          <div className="title">今日头条/微信等渠道获取用户数统计</div>
          <img src={png2} />
        </div>
        <div className="chart2">
          <div className="title">今日头条/微信等渠道费用统计</div>
          <img src={png3} />
        </div>
        <div className="chart2">
          <div className="title">今日头条/微信等渠道费用和获取用户数——转化率</div>
          <img src={png4} />
        </div>
        <div className="chart2">
          <div className="title">我的团队</div>
          <Button type="primary" className="my-btn">新增</Button>
          <Table columns={columns} dataSource={data} className="team-table" />
        </div>
      </div>
    );
  }
}

export default Index;
