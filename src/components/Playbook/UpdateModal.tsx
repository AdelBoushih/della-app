import { updatePlaybook } from "../../store/playbooks/actions";
import { connect } from "react-redux";
import {
  PlaybooksState,
  Playbook,
  Section,
  Field,
} from "../../store/playbooks/types";
import { ApplicationState } from "../../store";
import { useEffect, useState } from "react";
import { Form, Button, Modal, Divider } from "antd";
import { v4 as uuidv4 } from "uuid";
import { SectionComponent } from "./Section";
import { FormInput } from "../FormInput";

import { showLanguage, codeLanguage } from "../../utils/language";

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
  selectedPlaybook: Playbook;
}

interface PropsFromDispatch {
  updatePlaybook: typeof updatePlaybook;
}

type AllProps = PropsFromDispatch & CreateModalProps & PlaybooksState;

const PlaybookForm = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  onRequestFinished,
  selectedPlaybook,
  updatePlaybook,
  loading,
}: AllProps) => {
  const [requestSent, setRequestSent] = useState(false);
  const [form] = Form.useForm();

  const [playbook, setPlaybook] = useState(selectedPlaybook);

  useEffect(() => {
    if (!loading && requestSent) {
      setRequestSent(false);
      onRequestFinished("Success!", "Playbook updated!");
    }
  }, [loading]);

  useEffect(() => {
    setPlaybook(selectedPlaybook);
  }, [selectedPlaybook, isModalVisible]);

  const onFinish = (values: Playbook) => {
    setRequestSent(true);
    console.log(playbook);
    updatePlaybook(playbook);
  };
  const addSection = () => {
    setPlaybook({
      ...playbook,
      sections: [
        ...playbook.sections,
        { id: uuidv4(), name: "New Section", fields: [] },
      ],
    });
  };

  const removeSection = (sectionId: string) => {
    const sections = playbook.sections.reduce((_sections, _section) => {
      if (_section.id === sectionId) {
        return _sections;
      }
      return [..._sections, _section];
    }, [] as Section[]);
    setPlaybook({
      ...playbook,
      sections,
    });
  };

  const removeQuestion = (sectionId: string, fieldId: string) => {
    const sections = playbook.sections.reduce((_sections, _section) => {
      if (_section.id === sectionId) {
        const fields = _section.fields.reduce((_fields, _field) => {
          if (_field.id === fieldId) {
            return _fields;
          }
          return [..._fields, _field];
        }, [] as Field[]);
        return [..._sections, { ..._section, fields }];
      }
      return [..._sections, _section];
    }, [] as Section[]);
    setPlaybook({
      ...playbook,
      sections,
    });
  };

  const addQuestion = (sectionId: string) => {
    const sections = playbook.sections.reduce((_sections, _section) => {
      if (_section.id === sectionId) {
        return [
          ..._sections,
          {
            ..._section,
            fields: [..._section.fields, { id: uuidv4(), question: "" }],
          },
        ];
      }
      return [..._sections, _section];
    }, [] as Section[]);
    setPlaybook({
      ...playbook,
      sections,
    });
  };

  const onNameChange = (event: any) => {
    setPlaybook({
      ...playbook,
      name: event.target.value,
    });
  };

  const onDescriptionChange = (event: any) => {
    setPlaybook({
      ...playbook,
      description: event.target.value,
    });
  };

  const onLanguageChange = (event: any) => {
    setPlaybook({
      ...playbook,
      language: codeLanguage(event.target.value),
    });
  };

  const handleSectionNameChange = (value: string, sectionId: string) => {
    const sections = playbook.sections.reduce((_sections, _section) => {
      if (_section.id === sectionId) {
        return [..._sections, { ..._section, name: value }];
      }
      return [..._sections, _section];
    }, [] as Section[]);
    setPlaybook({
      ...playbook,
      sections,
    });
  };

  const handleFieldChange = (
    value: string,
    sectionId: string,
    fieldId: string
  ) => {
    const sections = playbook.sections.reduce((_sections, _section) => {
      if (_section.id === sectionId) {
        const fields = _section.fields.reduce((_fields, _field) => {
          if (_field.id === fieldId) {
            return [..._fields, { ..._field, question: value }];
          }
          return [..._fields, _field];
        }, [] as Field[]);
        return [..._sections, { ..._section, fields }];
      }
      return [..._sections, _section];
    }, [] as Section[]);
    setPlaybook({
      ...playbook,
      sections,
    });
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
          form="update-playbook-form"
          loading={loading}
        >
          Send
        </Button>,
      ]}
      width={1024}
    >
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        id="update-playbook-form"
      >
        <Divider orientation="left">Playbook informations</Divider>

        <FormInput
          placeholder="Name..."
          label="Name"
          value={playbook.name}
          onChange={onNameChange}
        />
        <FormInput
          placeholder="Language..."
          label="Language"
          value={showLanguage(playbook.language)}
          onChange={onLanguageChange}
        />
        <FormInput
          placeholder="Description..."
          label="Description"
          value={playbook.description}
          onChange={onDescriptionChange}
        />

        <Divider orientation="left">Sections</Divider>
        {playbook.sections.map((section) => {
          return (
            <SectionComponent
              section={section}
              handleFieldChange={handleFieldChange}
              handleSectionNameChange={handleSectionNameChange}
              addQuestion={addQuestion}
              removeSection={removeSection}
              removeQuestion={removeQuestion}
            />
          );
        })}
        <Button type="primary" onClick={() => addSection()}>
          Add section
        </Button>
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ playbooks }: ApplicationState) => ({
  data: playbooks.data,
  loading: playbooks.loading,
});

const mapDispatchToProps = { updatePlaybook };
export default connect(mapStateToProps, mapDispatchToProps)(PlaybookForm);
