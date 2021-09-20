import React, { useState } from "react";
import DocumentList from "../../components/Document/List";
import { Card } from "antd";
import { Button, Row, Col, notification } from "antd";
import { CloudUploadOutlined, SmileOutlined } from "@ant-design/icons";

import Upload from "../../components/Document/Upload";

export const DocumentView: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onRequestFinished = (type: string, message: string) => {
    notification.open({
      message: type,
      description: message,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Row justify="space-between" className="mb-2">
        <Col>
          <h3 className="title">Documents Management</h3>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => showModal()}
            icon={<CloudUploadOutlined />}
          >
            Upload a new Document
          </Button>
        </Col>
      </Row>
      <Card>
        <DocumentList onRequestFinished={onRequestFinished} />
      </Card>
      <Upload
        title="Upload a new Document"
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onRequestFinished={onRequestFinished}
      />
    </div>
  );
};
