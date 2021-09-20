import React from "react";
import { Layout } from "antd";
import "../stylesheets/Sidebar.css";
import Sidebar from "./Sidebar";
import Container from "./Container";
import Navbar from "./Navbar";

const { Footer } = Layout;

export default class Dashboard extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout">
          <Navbar />
          <Container />
          <Footer style={{ textAlign: "center" }}>
            Della Test ©{new Date().getFullYear()} By Adel Boushih
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
