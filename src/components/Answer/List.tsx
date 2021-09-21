import { Card, Typography, Tag, Collapse, List, Button } from "antd";
import { DocumentsState } from "../../store/documents/types";
import { fetchAnswers } from "../../store/documents/actions";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { useEffect, useState } from "react";
import { AnswerMetadata } from "../../types/Answer";
import CorrectAnswer from "./CorrectAnswer";
import { EditOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;
const { Panel } = Collapse;

interface PropsFromDispatch {
  fetchAnswers: typeof fetchAnswers;
}
interface DocumentListProps {
  onRequestFinished: (type: string, message: string) => void;
  documentId: string;
}

type AllProps = DocumentsState & PropsFromDispatch & DocumentListProps;
const AnswerList = ({
  documentId,
  answers,
  fetchAnswers,
  onRequestFinished,
}: AllProps) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>();
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerMetadata>();
  const [showCorrectAnswerModal, setShowCorrectAnswerModal] = useState(false);

  const [documentAnswers, setDocumentAnswers] = useState<
    (AnswerMetadata & { questionId: string })[]
  >([]);

  useEffect(() => {
    if (documentId) fetchAnswers(documentId);
  }, []);

  useEffect(() => {
    if (answers) {
      setDocumentAnswers(
        Object.entries(answers).map((entry) => ({
          ...entry[1],
          predictions: entry[1].predictions.filter(
            (prediction) => !prediction.isSilent
          ),
          questionId: entry[0],
        }))
      );
    }
  }, [answers]);

  return (
    <>
      {documentAnswers.map((answer) => (
        <Card style={{ marginBottom: "8px" }}>
          <Title level={4}>Question: {answer.input?.question}</Title>
          {answer.predictions?.length ? (
            <div>
              <Text>
                <strong>Top Answer: &nbsp;</strong>
                {answer.predictions?.[0]?.textSelection.text}
              </Text>
              <div>
                <span className="confidence-text">confidence:</span>
                <Tag
                  color={
                    answer.predictions?.[0]?.confidence > 0.6
                      ? "success"
                      : "processing"
                  }
                >
                  {`${Math.round(answer.predictions?.[0]?.confidence * 100)}%`}
                </Tag>
                <div style={{ margin: "16px 0 8px 0" }}>
                  <Title level={5}>Evidence</Title>
                  <Text type="secondary">
                    {`“ ${answer.predictions?.[0]?.textSelection.evidence} ”`}
                  </Text>
                </div>
              </div>
              <Collapse ghost>
                <Panel header="More answers" key="1" style={{ color: "blue" }}>
                  <div style={{ paddingLeft: "16px" }}>
                    <List
                      itemLayout="horizontal"
                      dataSource={answer.predictions.slice(1)}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <Text style={{ fontSize: "11px" }}>
                                {item.textSelection?.text}
                              </Text>
                            }
                            description={
                              <div>
                                <span className="confidence-text">
                                  confidence:
                                </span>
                                <Tag
                                  color={
                                    item?.confidence > 0.6
                                      ? "success"
                                      : "processing"
                                  }
                                >
                                  {`${Math.round(item?.confidence * 100)}%`}
                                </Tag>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                </Panel>
              </Collapse>

              {answer.userCorrection?.textSelections.length ? (
                <div style={{ margin: "16px 0 8px 0" }}>
                  <Title level={5}>Manual Correction</Title>
                  {answer.userCorrection.textSelections.map(
                    (textSelection, index) => (
                      <Text key={index}>{textSelection.text}</Text>
                    )
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="edit-answer-button">
            <Button
              style={{ color: "#1890ff" }}
              size="small"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedAnswerId(answer.questionId);
                setSelectedAnswer(answer);
                setShowCorrectAnswerModal(true);
              }}
            />
          </div>
        </Card>
      ))}
      {documentId && selectedAnswerId && selectedAnswer ? (
        <CorrectAnswer
          documentId={documentId}
          questionId={selectedAnswerId}
          answer={selectedAnswer}
          isModalVisible={showCorrectAnswerModal}
          handleOk={() => setShowCorrectAnswerModal(false)}
          handleCancel={() => setShowCorrectAnswerModal(false)}
          onRequestFinished={onRequestFinished}
        />
      ) : null}
    </>
  );
};
const mapStateToProps = ({ documents }: ApplicationState) => ({
  data: documents.data,
  answers: documents.answers,
  loading: documents.loading,
});

const mapDispatchToProps = { fetchAnswers };
export default connect(mapStateToProps, mapDispatchToProps)(AnswerList);
