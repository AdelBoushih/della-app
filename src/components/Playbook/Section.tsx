import React from "react";
import { Divider, Button, Col, Row } from "antd";
import { Section } from "../../store/playbooks/types";
import { FormInput } from "../FormInput";
import { CloseOutlined } from "@ant-design/icons";

const addFieldButtonStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "4px",
};
export const SectionComponent: React.FC<SectionProps> = ({
  section,
  handleSectionNameChange,
  handleFieldChange,
  addQuestion,
  removeSection,
  removeQuestion,
}) => {
  const onSectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSectionNameChange(e.target.value, section.id);
  };

  const onFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldId: string
  ) => {
    handleFieldChange(e.target.value, section.id, fieldId);
  };

  return (
    <>
      <div className="section-container">
        <Divider orientation="center" style={{ marginTop: "-8px" }}>
          {section.name}
        </Divider>
        <FormInput
          placeholder="Section name..."
          label="Name:"
          value={section.name}
          onChange={onSectionNameChange}
        />
        <div>
          {section.fields.map((field, index) => {
            return (
              <Row align="middle">
                <Col span={23}>
                  <FormInput
                    label={`Question N°${index + 1}`}
                    placeholder="Question..."
                    value={field.question}
                    onChange={(e) => onFieldChange(e, field.id)}
                  />
                </Col>
                <Col span={1} style={{ textAlign: "center" }}>
                  <Button
                    size="small"
                    shape="circle"
                    icon={<CloseOutlined />}
                    onClick={() => {
                      removeQuestion(section.id, field.id);
                    }}
                  />
                </Col>
              </Row>
            );
          })}
          <div style={addFieldButtonStyle}>
            <Button
              size="small"
              type="primary"
              onClick={() => addQuestion(section.id)}
            >
              Add Question
            </Button>
          </div>
        </div>
        <div className="close-section-button">
          <Button
            size="small"
            shape="circle"
            icon={<CloseOutlined />}
            onClick={() => {
              removeSection(section.id);
            }}
          />
        </div>
      </div>
    </>
  );
};

interface SectionProps {
  section: Section;
  handleSectionNameChange: (value: string, sectionId: string) => void;
  handleFieldChange: (
    value: string,
    sectionId: string,
    fieldId: string
  ) => void;
  addQuestion: (sectionId: string) => void;
  removeSection: (sectionId: string) => void;
  removeQuestion: (sectionId: string, fieldId: string) => void;
}
