import React from "react";
import { Layout, Menu } from "antd";
import {
  SnippetsOutlined,
  HomeOutlined,
  BookOutlined,
} from "@ant-design/icons";
import "../stylesheets/Sidebar.css";
import { Link } from "react-router-dom";
const { Sider } = Layout;

export default class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ collapsed: window.innerWidth <= 760 });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  render() {
    const { collapsed } = this.state;
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div
          className="logo"
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "25px",
          }}
        >
          <img
            alt="Della Logo"
            src="/logo_della_noir_blanc.png"
            style={{ width: collapsed ? "50px" : "120px" }}
          />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
          <Menu.Item key="0" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<SnippetsOutlined />}>
            <Link to="/documents">Documents</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/playbooks">Playbooks</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
