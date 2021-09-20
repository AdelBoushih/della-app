import React, { useState } from "react";
import PlaybookList from "../../components/Playbook/List";
import { Card } from "antd";
import { Button, Row, Col, notification } from "antd";
import { AppstoreAddOutlined, SmileOutlined } from "@ant-design/icons";

import UpdateModal from "../../components/Playbook/UpdateModal";
import { Playbook } from "../../store/playbooks/types";

export const PlaybookView: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook>();
  const [title, setTitle] = useState("");

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

  const selectPlaybook = (playbook: Playbook) => {
    setSelectedPlaybook(playbook);
    setTitle("Upload playbook");
    showModal();
  };

  return (
    <div>
      <Row justify="space-between" className="mb-2">
        <Col>
          <h3 className="title">Playbooks Management</h3>
        </Col>
        <Col>
          <Button
            disabled
            type="primary"
            onClick={() => showModal()}
            icon={<AppstoreAddOutlined />}
          >
            Add a new playbook
          </Button>
        </Col>
      </Row>
      <Card>
        <PlaybookList
          selectPlaybook={selectPlaybook}
          onRequestFinished={onRequestFinished}
        />
      </Card>
      {selectedPlaybook ? (
        <UpdateModal
          title={title}
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          onRequestFinished={onRequestFinished}
          selectedPlaybook={selectedPlaybook}
        />
      ) : null}
    </div>
  );
};
