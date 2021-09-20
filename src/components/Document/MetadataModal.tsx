import {
  fetchMetadataRequest,
  updateMetadata,
} from "../../store/documents/actions";
import { connect } from "react-redux";
import {
  DocumentsState,
  DocumentType,
  Party,
} from "../../store/documents/types";
import { ApplicationState } from "../../store";
import { useEffect, useState } from "react";
import { Button, Modal, Table, Select, Tag, Input } from "antd";

import { showLanguage } from "../../utils/language";

const { Option } = Select;

interface CreateModalProps {
  documentId?: string;
  title: string;
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onRequestFinished: (type: string, message: string) => void;
}

interface PropsFromDispatch {
  fetchMetadataRequest: typeof fetchMetadataRequest;
  updateMetadata: typeof updateMetadata;
}

type AllProps = PropsFromDispatch & CreateModalProps & DocumentsState;

const MetadataModal = ({
  documentId,
  metadata,
  title,
  isModalVisible,
  updateMetadata,
  handleOk,
  handleCancel,
  onRequestFinished,
  fetchMetadataRequest,
  loading,
}: AllProps) => {
  const [requestSent, setRequestSent] = useState(false);
  const [documentMetada, setDocumentMetada] = useState<
    {
      key: string;
      metadata: string;
      prediction: unknown;
      userCorrection?: unknown;
      predictedOn: Date;
    }[]
  >([]);
  const [userCorrections, setUserCorrections] =
    useState<Record<string, unknown | object>>();

  useEffect(() => {
    if (!loading && requestSent) {
      setRequestSent(false);
      onRequestFinished("Success!", "Metadata updated!");
    }
  }, [loading]);

  useEffect(() => {
    if (documentId) fetchMetadataRequest(documentId);
  }, [documentId]);

  const onUpdateMetadata = () => {
    if (userCorrections && documentId) {
      const corrections: { key: string; value: unknown }[] = [];

      for (const [key, value] of Object.entries(userCorrections)) {
        corrections.push({ key, value });
      }
      updateMetadata({ documentId, corrections });
      onRequestFinished("Success!", "Metadata updated!");
    }
  };

  useEffect(() => {
    if (metadata) {
      const docMetadata: {
        key: string;
        metadata: string;
        prediction: unknown;
        userCorrection?: unknown;
        predictedOn: Date;
      }[] = [];

      if (metadata?.contract)
        docMetadata.push({
          key: "contract",
          metadata: "Contract",
          prediction: metadata.contract?.prediction.value ? "Yes" : "No",
          userCorrection: metadata.contract?.userCorrection
            ? metadata.contract?.userCorrection?.value
              ? "Yes"
              : "No"
            : undefined,
          predictedOn: metadata.contract?.prediction.predictedOn,
        });
      if (metadata?.language)
        docMetadata.push({
          key: "language",
          metadata: "Language",
          prediction: showLanguage(metadata.language?.prediction.value),
          userCorrection: showLanguage(
            metadata.language?.userCorrection?.value as string
          ),
          predictedOn: metadata.language?.prediction.predictedOn,
        });
      if (metadata?.type) {
        metadata.type.prediction.value.forEach((_value, _index) => {
          docMetadata.push({
            key: "type",
            metadata: "Type",
            prediction: renderTypeBlock(_value),
            userCorrection: metadata.type?.userCorrection
              ? renderTypeBlock(
                  (metadata.type?.userCorrection.value as DocumentType[])?.[
                    _index
                  ]
                )
              : undefined,
            predictedOn: metadata.type?.prediction.predictedOn!,
          });
        });
      }
      if (metadata?.parties) {
        metadata.parties.prediction.value.forEach((_value, _index) => {
          docMetadata.push({
            key: "parties",
            metadata: "Parties",
            prediction: renderPartiesBlock(_value),
            userCorrection: metadata.parties?.userCorrection
              ? renderPartiesBlock(
                  (metadata.parties?.userCorrection.value as Party[])?.[_index]
                )
              : undefined,
            predictedOn: metadata.type?.prediction.predictedOn!,
          });
        });
      }
      setDocumentMetada(docMetadata);

      const defaultPartiesValue = (
        metadata?.parties?.userCorrection?.value as {
          countryOfIncorporation: string;
          legalName: string;
        }[]
      )?.[0];
      if (defaultPartiesValue?.countryOfIncorporation)
        setUserCorrection(
          defaultPartiesValue.countryOfIncorporation,
          "parties",
          "countryOfIncorporation"
        );
      if (defaultPartiesValue?.legalName)
        setUserCorrection(
          defaultPartiesValue.legalName,
          "parties",
          "legalName"
        );

      const defaultTypeValue = (
        metadata?.type?.userCorrection?.value as {
          type: { label: string; category: string };
        }[]
      )?.[0];

      if (defaultTypeValue?.type?.label)
        setUserCorrection(defaultTypeValue.type.label, "type", "label");
      if (defaultTypeValue?.type?.category)
        setUserCorrection(defaultTypeValue.type?.category, "type", "category");
    }
  }, [metadata]);

  const renderPartiesBlock = (party: Party) => (
    <>
      {party?.countryOfIncorporation ? (
        <>
          <strong>Country of Incorporation:&nbsp;</strong>
          {party.countryOfIncorporation?.text ?? party.countryOfIncorporation}
        </>
      ) : null}
      <br />
      {party?.legalName ? (
        <>
          <strong>Legal Name:&nbsp;</strong>
          {party.legalName?.text ?? party.legalName}
        </>
      ) : null}
    </>
  );

  const renderTypeBlock = (type: DocumentType) => (
    <>
      {type?.label ? (
        <>
          <strong>Label:&nbsp;</strong>
          {type.label}
          <br />
        </>
      ) : null}
      {type?.category ? (
        <>
          <strong>Category:&nbsp;</strong>
          {type.category}
          <br />
        </>
      ) : null}
      {type?.confidence ? (
        <>
          <strong>Confidence:&nbsp;</strong>
          <Tag color={type.confidence > 0.6 ? "success" : "processing"}>
            {`${type.confidence * 100}%`}
          </Tag>
        </>
      ) : null}
    </>
  );

  const handleContractChange = (value: string, key: string) => {
    setUserCorrections({
      ...userCorrections,
      [key]: value === "yes" ? true : false,
    });
    console.log(userCorrections);
  };

  const handleLanguageChange = (value: string, key: string) => {
    setUserCorrections({
      ...userCorrections,
      [key]: value,
    });
  };

  const setUserCorrection = (value: string, key: string, subKey: string) => {
    setUserCorrections({
      ...userCorrections,
      [key]: [
        {
          ...(
            (userCorrections as Record<string, object>)?.[key] as Record<
              string,
              object
            >[]
          )?.[0],
          [subKey]: value,
        },
      ],
    });
  };

  const renderCorrectMetadaInput = (key: string) => {
    switch (key) {
      case "contract":
        return (
          <Select
            placeholder="Correct prediction"
            style={{ width: 160 }}
            onChange={(value: string) => {
              handleContractChange(value, key);
            }}
          >
            <Option value="yes">yes</Option>
            <Option value="no">no</Option>
          </Select>
        );
      case "language":
        return (
          <Select
            placeholder="Correct prediction"
            style={{ width: 160 }}
            onChange={(value: string) => {
              handleLanguageChange(value, key);
            }}
          >
            <Option value="en">English</Option>
            <Option value="fr">Français</Option>
          </Select>
        );
      case "type": {
        return (
          <>
            <Input
              style={{ width: 160, marginBottom: "8px" }}
              placeholder="Label"
              onChange={(e) => setUserCorrection(e.target.value, key, "label")}
            />
            <Input
              style={{ width: 160 }}
              placeholder="Category"
              name="name"
              onChange={(e) =>
                setUserCorrection(e.target.value, key, "category")
              }
            />
          </>
        );
      }
      case "parties":
        return (
          <>
            <Input
              style={{ width: 160, marginBottom: "8px" }}
              placeholder="Country Of Incorporation"
              onChange={(e) =>
                setUserCorrection(e.target.value, key, "countryOfIncorporation")
              }
            />
            <Input
              style={{ width: 160 }}
              placeholder="Legal name"
              onChange={(e) =>
                setUserCorrection(e.target.value, key, "legalName")
              }
            />
          </>
        );
      default:
        break;
    }
  };

  const columns = [
    {
      title: "Metadata",
      dataIndex: "metadata",
      key: "metadata",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Prediction",
      dataIndex: "prediction",
      key: "prediction",
    },
    {
      title: "Predicted on",
      dataIndex: "predictedOn",
      key: "predictedOn",
      render: (key: Date) => {
        const date = new Date(key);
        return date.toDateString();
      },
    },
    {
      title: "User correction",
      dataIndex: "userCorrection",
      key: "userCorrection",
      render: (userCorrection: string) => {
        if (!userCorrection) return "---";
        return userCorrection;
      },
    },
    {
      title: "Correct prediction",
      dataIndex: "correctPrediction",
      key: "correctPrediction",
      render: (
        _value: string,
        row: {
          key: string;
          metadata: string;
          prediction: unknown;
          predictedOn: Date;
        }
      ) => {
        return renderCorrectMetadaInput(row.key);
      },
    },
  ];

  return (
    <Modal
      title={title}
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
          loading={loading}
          onClick={onUpdateMetadata}
        >
          Correct values
        </Button>,
      ]}
      width={1024}
    >
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={documentMetada}
          rowKey={(record) => record.key}
          className="responsive-table"
        />
      </div>
    </Modal>
  );
};
const mapStateToProps = ({ documents }: ApplicationState) => ({
  data: documents.data,
  metadata: documents.metadata,
  loading: documents.loading,
});

const mapDispatchToProps = { fetchMetadataRequest, updateMetadata };
export default connect(mapStateToProps, mapDispatchToProps)(MetadataModal);
