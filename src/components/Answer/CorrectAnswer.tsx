import { correctAnswer } from "../../store/documents/actions";
import { connect } from "react-redux";
import { DocumentsState } from "../../store/documents/types";
import { AnswerMetadata } from "../../types/Answer";
import { ApplicationState } from "../../store";
import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Modal,
  Divider,
  Select,
  Row,
  Col,
  Typography,
} from "antd";

import { FormInput } from "../FormInput";

const { Text } = Typography;
const { Option } = Select;

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
  answer: AnswerMetadata;
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
  answer,
}: AllProps) => {
  const [correctedAnswer, setCorrectedAnswer] = useState("");
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
          isSilent: false,
          text: correctedAnswer,
          textStartOffset: 0,
          textEndOffset: 0,
          userTextCorrection: correctedAnswer,
        },
      ],
    });
    setRequestSent(true);
  };

  const onAnswerChange = (event: any) => {
    setCorrectedAnswer(event.target.value);
  };

  const onAnswerChoice = (value: string) => {
    setCorrectedAnswer(value);
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
        <Divider orientation="left">Choose an Answer </Divider>

        <Row justify="end">
          <Col span={4}>
            <Text>Predictions:</Text>
          </Col>
          <Col span={20}>
            <Select
              placeholder="Pick an answer"
              style={{ width: 810 }}
              onChange={(value: string) => {
                onAnswerChoice(value);
              }}
            >
              {answer?.predictions.map((prediction, index) => (
                <Option value={prediction.textSelection.text}>
                  {prediction.textSelection.text}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Divider orientation="left">Or Type a New Answer</Divider>

        <FormInput
          placeholder="Type answer..."
          label="Manual Answer: "
          value={correctedAnswer}
          onChange={onAnswerChange}
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
