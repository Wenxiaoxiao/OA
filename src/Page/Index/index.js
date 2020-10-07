import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import './index.scss';
import png1 from '../../images/1.png';
import png2 from '../../images/2.png';
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
                <span>今日头条:12</span>&nbsp;|&nbsp;
                <span>微信:12</span>
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
        <div className="chart1">
          <div className="title">笔记/散文/问答数统计</div>
          <img src={png1} />
        </div>
        <div className="chart2">
          <div className="title">今日头条/微信等渠道获取用户数统计</div>
          <img src={png2} />
        </div>
      </div>
    );
  }
}

export default Index;
