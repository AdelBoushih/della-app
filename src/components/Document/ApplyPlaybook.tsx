import {
  applyPlaybook,
  fetchOnePlaybookRequest,
  fetchRequest,
} from "../../store/playbooks/actions";

import { connect } from "react-redux";
import { PlaybooksState } from "../../store/playbooks/types";
import { ApplicationState } from "../../store";
import { useEffect, useState } from "react";
import { Form, Button, Modal, Select, Row, Col } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import UpdateModal from "../Playbook/UpdateModal";

const { Option } = Select;

const layout = {
  labelCol: { span: 4, sm: 6 },
  wrapperCol: { span: 20, sm: 18 },
};

interface ModalProps {
  documentId?: string;
  title: string;
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onRequestFinished: (type: string, message: string) => void;
}

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest;
  applyPlaybook: typeof applyPlaybook;
  fetchOnePlaybookRequest: typeof fetchOnePlaybookRequest;
}

type AllProps = PropsFromDispatch & ModalProps & PlaybooksState;

const ApplyPlaybook = ({
  playbook,
  documentId,
  applyPlaybook,
  fetchOnePlaybookRequest,
  data,
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  fetchRequest,
  onRequestFinished,
  loading,
}: AllProps) => {
  const [requestSent, setRequestSent] = useState(false);
  const [showPlaybookModal, setShowPlaybookModal] = useState(false);
  const [selectedPlaybookId, setSelectedPlaybookId] = useState<string>();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRequest("");
  }, []);

  useEffect(() => {
    if (!loading && requestSent) {
      setRequestSent(false);
      onRequestFinished("Success!", "Document uploaded");
    }
  }, [loading]);

  const onFinish = () => {
    console.log({ documentId, playbookId: selectedPlaybookId });
    if (documentId && selectedPlaybookId) {
      applyPlaybook({ documentId, playbookId: selectedPlaybookId });
    }
  };

  const handleChange = (playbookId: string) => {
    setSelectedPlaybookId(playbookId);
  };

  const previewPlaybook = () => {
    if (selectedPlaybookId && !playbook)
      fetchOnePlaybookRequest(selectedPlaybookId);
    setShowPlaybookModal(true);
  };

  const handleCloseUpdatePlaybookModal = () => {
    setShowPlaybookModal(false);
  };

  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={onFinish}
        >
          Apply
        </Button>,
      ]}
    >
      <Form {...layout} form={form} name="control-hooks" id="apply-form">
        <Row align="middle" justify="space-around">
          <Col span={22}>
            <Select
              style={{ width: "100%" }}
              placeholder="Choose the Playbook to apply"
              onChange={handleChange}
            >
              {data.map((playbook) => {
                return <Option value={playbook.id}>{playbook.name}</Option>;
              })}
            </Select>
          </Col>
          <Col span={2} style={{ textAlign: "center" }}>
            {selectedPlaybookId ? (
              <Button
                size="small"
                shape="circle"
                icon={<EyeOutlined />}
                onClick={() => {
                  previewPlaybook();
                }}
              />
            ) : null}
          </Col>
        </Row>
      </Form>
      {playbook ? (
        <UpdateModal
          title="Update Playbook"
          isModalVisible={showPlaybookModal}
          handleOk={handleCloseUpdatePlaybookModal}
          handleCancel={handleCloseUpdatePlaybookModal}
          onRequestFinished={onRequestFinished}
          selectedPlaybook={playbook}
        />
      ) : null}
    </Modal>
  );
};
const mapStateToProps = ({ playbooks }: ApplicationState) => ({
  data: playbooks.data,
  playbook: playbooks.playbook,
  loading: playbooks.loading,
});

const mapDispatchToProps = {
  fetchRequest,
  applyPlaybook,
  fetchOnePlaybookRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplyPlaybook);
