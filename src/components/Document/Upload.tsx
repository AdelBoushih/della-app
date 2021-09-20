import { storeDocument, updateMetadata } from "../../store/documents/actions";
import { connect } from "react-redux";
import { DocumentsState } from "../../store/documents/types";
import { ApplicationState } from "../../store";
import { useEffect, useState } from "react";
import { Form, Button, Modal } from "antd";

const layout = {
  labelCol: { span: 4, sm: 6 },
  wrapperCol: { span: 20, sm: 18 },
};

interface CreateModalProps {
  title: string;
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onRequestFinished: (type: string, message: string) => void;
}

interface PropsFromDispatch {
  storeDocument: typeof storeDocument;
}

type AllProps = PropsFromDispatch & CreateModalProps & DocumentsState;

const DocumentForm = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  storeDocument,
  onRequestFinished,
  loading,
}: AllProps) => {
  const [requestSent, setRequestSent] = useState(false);
  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!loading && requestSent) {
      setRequestSent(false);
      onRequestFinished("Success!", "Document uploaded");
    }
  }, [loading]);

  const onFinish = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("projectId", process.env.REACT_APP_PROJECT_ID!);

      setRequestSent(true);
      storeDocument(formData);
    }
  };

  const onFileChange = (event: any) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
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
          htmlType="submit"
          form="myForm"
          loading={loading}
        >
          Upload
        </Button>,
      ]}
    >
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        id="myForm"
      >
        <input
          id="files"
          accept=".pdf,.docx,.doc,.txt"
          type="file"
          onChange={onFileChange}
          multiple
        />
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ documents }: ApplicationState) => ({
  data: documents.data,
  loading: documents.loading,
});

const mapDispatchToProps = { storeDocument, updateMetadata };
export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);
