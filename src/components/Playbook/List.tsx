import { Table, Popconfirm, Button, Space } from "antd";
import { PlaybooksState, Playbook } from "../../store/playbooks/types";
import { fetchRequest, deletePlaybook } from "../../store/playbooks/actions";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { DeleteOutlined, EditOutlined, DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import {} from "@ant-design/icons";
import { useEffect } from "react";

import { showLanguage } from "../../utils/language";

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest;
  deletePlaybook: typeof deletePlaybook;
}
interface PlaybookListProps {
  selectPlaybook: (playbook: Playbook) => void;
  onRequestFinished: (type: string, message: string) => void;
}

type AllProps = PlaybooksState & PropsFromDispatch & PlaybookListProps;
const PlaybookList = ({
  selectPlaybook,
  data,
  loading,
  deletePlaybook,
  fetchRequest,
  onRequestFinished,
}: AllProps) => {
  const getMenu = (record: Playbook) => {
    return (
      <Menu>
        <Menu.Item
          key="3"
          icon={<EditOutlined />}
          style={{ color: "#108ee9" }}
          onClick={() => selectPlaybook(record)}
        >
          Update
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<DeleteOutlined />}
          style={{ color: "#eb4d4b" }}
        >
          <Popconfirm
            arrowPointAtCenter
            title="Are you sure you want to delete this Playbook?"
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
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: (text: string) => showLanguage(text),
    },
    {
      title: "Created at",
      dataIndex: "created",
      key: "created",
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
    deletePlaybook(id);
    onRequestFinished("Success!", "Playbook deleted!");
  };
  useEffect(() => {
    fetchRequest("");
  }, []);

  useEffect(() => {
    data.forEach((playbook) => {
      playbook.language = showLanguage(playbook.language);
      console.log(showLanguage(playbook.language));
    });
  }, []);

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.id}
      className="responsive-table"
    />
  );
};
const mapStateToProps = ({ playbooks }: ApplicationState) => ({
  data: playbooks.data,
  loading: playbooks.loading,
});

const mapDispatchToProps = { fetchRequest, deletePlaybook };
export default connect(mapStateToProps, mapDispatchToProps)(PlaybookList);
