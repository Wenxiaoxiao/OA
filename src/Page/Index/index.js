import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import './index.scss';

class Index extends Component {
  state = {
    loading: false,
  }



  render() {
    return (
      <div className="Index-wrapper">
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
        </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
        </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
        </Card>
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}

export default Index;
