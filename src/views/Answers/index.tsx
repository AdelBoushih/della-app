import React from "react";
import { Card } from "antd";
import { Row, Col, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import AnswerList from "../../components/Answer/List";
import { useParams } from "react-router-dom";

export const AnswersView: React.FC = () => {
  const { documentId } = useParams<Record<string, string | undefined>>();

  const onRequestFinished = (type: string, message: string) => {
    notification.open({
      message: type,
      description: message,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  return (
    <div>
      <Row justify="space-between" className="mb-2">
        <Col>
          <h3 className="title">Document answers</h3>
        </Col>
      </Row>
      <Card>
        <AnswerList
          onRequestFinished={onRequestFinished}
          documentId={documentId!}
        />
      </Card>
    </div>
  );
};
