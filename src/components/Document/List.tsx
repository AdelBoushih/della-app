import { Table, Popconfirm, Button, Space, Tag } from "antd";
import {
  DocumentsState,
  Document,
  DocumentStatus,
} from "../../store/documents/types";
import { fetchRequest, deleteDocument } from "../../store/documents/actions";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import {
  DeleteOutlined,
  DownOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  FileSearchOutlined,
  FileOutlined,
  PartitionOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import {} from "@ant-design/icons";
import { useEffect, useState } from "react";

import MetadataModal from "./MetadataModal";
import ApplyPlaybook from "./ApplyPlaybook";
import { useHistory } from "react-router-dom";

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest;
  deleteDocument: typeof deleteDocument;
}
interface DocumentListProps {
  onRequestFinished: (type: string, message: string) => void;
}

type AllProps = DocumentsState & PropsFromDispatch & DocumentListProps;
const DocumentList = ({
  data,
  loading,
  deleteDocument,
  fetchRequest,
  onRequestFinished,
}: AllProps) => {
  const history = useHistory();

  const [isMetadataModalVisible, setIsMetadataModalVisible] = useState(false);
  const [isApplyPlaybookModalVisible, setApplyPlaybookModalVisible] =
    useState(false);

  const [selectedDocumentId, setSelectedDocumentId] = useState<string>();

  const handleApplybookModalInteraction = () => {
    setApplyPlaybookModalVisible(false);
  };

  const handleOk = () => {
    setIsMetadataModalVisible(false);
  };

  const handleCancel = () => {
    setIsMetadataModalVisible(false);
  };

  const renderDocumentStatus = (status: DocumentStatus) => {
    switch (status) {
      case DocumentStatus.ERROR:
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Error
          </Tag>
        );

      case DocumentStatus.OCR:
        return (
          <Tag icon={<FileSearchOutlined />} color="processing">
            OCR
          </Tag>
        );

      case DocumentStatus.PDF_CONVERSION:
        return (
          <Tag icon={<FileOutlined />} color="processing">
            PDF Conversion
          </Tag>
        );

      case DocumentStatus.READY_FOR_ANSWERING:
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Ready for answering
          </Tag>
        );

      case DocumentStatus.TEXT_EXTRACTION:
        return (
          <Tag icon={<CheckCircleOutlined />} color="processing">
            Text extraction
          </Tag>
        );

      case DocumentStatus.TO_BE_PROCESSED:
        return (
          <Tag icon={<SyncOutlined spin />} color="processing">
            To be processed
          </Tag>
        );

      default:
        break;
    }
  };

  const getMenu = (record: Document) => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          icon={<MessageOutlined />}
          style={{ color: "#4cd137" }}
          onClick={() => {
            history.push(`/documents/${record.id}/answers`);
          }}
        >
          Show Answers
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<PartitionOutlined />}
          style={{ color: "#00a8ff" }}
          onClick={() => {
            setSelectedDocumentId(record.id);
            setApplyPlaybookModalVisible(true);
          }}
        >
          Apply Playbook
        </Menu.Item>

        <Menu.Item
          key="3"
          icon={<DeleteOutlined />}
          style={{ color: "#eb4d4b" }}
        >
          <Popconfirm
            arrowPointAtCenter
            title="Are you sure you want to delete this Document?"
            onConfirm={() => confirmDelete(record.id)}
            okText="Continue"
            cancelText="Cancel"
          >
            Delete
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Project ID",
      dataIndex: "projectId",
      key: "projectId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderDocumentStatus,
    },
    {
      title: "Metadata",
      key: "metadata",
      render: (_text: string, record: Document) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setSelectedDocumentId(record.id);
              setIsMetadataModalVisible(true);
            }}
          >
            Metadata
          </Button>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actons",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Dropdown overlay={getMenu(record)} trigger={["click"]}>
            <Button>
              Actions <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];
  const confirmDelete = (id: string) => {
    deleteDocument(id);
    onRequestFinished("Succes", "Document deleted!");
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        className="responsive-table"
      />
      <MetadataModal
        documentId={selectedDocumentId}
        title="Document Metadata"
        isModalVisible={isMetadataModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onRequestFinished={onRequestFinished}
      />
      <ApplyPlaybook
        documentId={selectedDocumentId}
        title="Apply playbook"
        isModalVisible={isApplyPlaybookModalVisible}
        handleOk={handleApplybookModalInteraction}
        handleCancel={handleApplybookModalInteraction}
        onRequestFinished={onRequestFinished}
      />
    </>
  );
};
const mapStateToProps = ({ documents }: ApplicationState) => ({
  data: documents.data,
  loading: documents.loading,
});

const mapDispatchToProps = { fetchRequest, deleteDocument };
export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
