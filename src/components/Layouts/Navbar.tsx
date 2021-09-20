import React from "react";
import { Layout, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default class Dashboard extends React.Component {
  render() {
    return (
      <Header
        className="site-layout-background"
        style={{ padding: 0, paddingRight: "35px" }}
      >
        <Row justify="end">
          <Col>
            <span style={{ marginRight: "10px" }}>Adel Boushih</span>
            <Avatar size="large" src="/user-image.png" />
          </Col>
        </Row>
      </Header>
    );
  }
}
