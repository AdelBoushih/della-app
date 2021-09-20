import React from "react";
import { Row, Col, Input } from "antd";

const formInputstyle = { margin: "8px 0" };

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <Row align="middle" style={formInputstyle}>
      <Col span={4}>
        <label>{label}</label>
      </Col>
      <Col span={20}>
        <Input
          placeholder={placeholder}
          name="name"
          value={value}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

interface FormInputProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
