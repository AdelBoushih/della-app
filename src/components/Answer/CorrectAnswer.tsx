import { correctAnswer } from "../../store/documents/actions";
import { connect } from "react-redux";
import { DocumentsState } from "../../store/documents/types";
import { ApplicationState } from "../../store";
import { useEffect, useState } from "react";
import { Form, Button, Modal, Divider } from "antd";

import { FormInput } from "../FormInput";

const layout = {
  labelCol: { span: 4, sm: 6 },
  wrapperCol: { span: 20, sm: 18 },
};

interface CreateModalProps {
  documentId: string;
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onRequestFinished: (type: string, message: string) => void;
  questionId: string;
}

interface PropsFromDispatch {
  correctAnswer: typeof correctAnswer;
}

type AllProps = PropsFromDispatch & CreateModalProps & DocumentsState;

const CorrectAnswer = ({
  documentId,
  isModalVisible,
  handleOk,
  handleCancel,
  onRequestFinished,
  correctAnswer,
  loading,
  questionId,
}: AllProps) => {
  const [correctedAnswer, setCorrectedAnswer] = useState("");
  const [evidence, setEvidence] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (!loading && requestSent) {
      onRequestFinished("Success!", "Answers updated!");
      setRequestSent(false);
    }
  }, [loading]);

  const onFinish = () => {
    correctAnswer({
      documentId,
      questionId,
      userTextSelections: [
        {
          text: correctedAnswer,
          evidence,
          textStartOffset: 0,
          textEndOffset: 0,
          evidenceStartOffset: 0,
          evidenceEndOffset: 0,
        },
      ],
    });
    setRequestSent(true);
  };

  const onAnswerChange = (event: any) => {
    setCorrectedAnswer(event.target.value);
  };

  const onEvidenceChange = (event: any) => {
    setEvidence(event.target.value);
  };

  return (
    <Modal
      title="Correct Answer"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Close
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={() => onFinish()}
          loading={loading}
        >
          Confirm
        </Button>,
      ]}
      width={1024}
    >
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        id="correct-answer-form"
      >
        <Divider orientation="left">New answer</Divider>

        <FormInput
          placeholder="Correct answer..."
          label="Correct answer"
          value={correctedAnswer}
          onChange={onAnswerChange}
        />
        <FormInput
          placeholder="Evidence..."
          label="Evidence"
          value={evidence}
          onChange={onEvidenceChange}
        />
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ documents }: ApplicationState) => ({
  data: documents.data,
  loading: documents.loading,
});

const mapDispatchToProps = { correctAnswer };
export default connect(mapStateToProps, mapDispatchToProps)(CorrectAnswer);
