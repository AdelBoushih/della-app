import { Answer } from "../../types/Answer";

export interface Document extends ApiResponse {
  id: string;
  name: string;
  projectId: string;
  status: DocumentStatus;
}
export enum DocumentStatus {
  ERROR = "ERROR",
  OCR = "OCR",
  PDF_CONVERSION = "PDF_CONVERSION",
  READY_FOR_ANSWERING = "READY_FOR_ANSWERING",
  TEXT_EXTRACTION = "TEXT_EXTRACTION",
  TO_BE_PROCESSED = "TO_BE_PROCESSED",
}

export interface UserCorrection {
  value: object | string;
  correctedOn: Date;
  correctedBy: string;
}

export interface Party {
  legalName?: {
    text: string;
    textStartOffset: number;
    textEndOffset: number;
  };
  countryOfIncorporation?: {
    text: string;
    textStartOffset: number;
    textEndOffset: number;
  };
}

export interface DocumentType {
  label: string;
  category: string;
  confidence: number;
  confidence_type: number;
  confidence_category: number;
}

export interface Metadata {
  contract?: {
    prediction: {
      predictedOn: Date;
      value: boolean;
    };
    userCorrection?: UserCorrection;
  };
  language?: {
    prediction: {
      predictedOn: Date;
      value: string;
    };
    userCorrection?: UserCorrection;
  };
  subtype?: {
    prediction: {
      predictedOn: Date;
      value: string;
    };
    userCorrection?: UserCorrection;
  };
  type?: {
    prediction: {
      predictedOn: Date;
      value: DocumentType[];
    };
    userCorrection?: UserCorrection;
  };
  parties?: {
    prediction: {
      predictedOn: Date;
      value: Party[];
    };
    userCorrection?: UserCorrection;
  };
  effectiveDate?: {
    prediction: {
      predictedOn: Date;
      value: string;
    };
    userCorrection?: UserCorrection;
  };
  governingLaw?: {
    prediction: {
      predictedOn: Date;
      value: [
        {
          label: string;
          text: string;
          textStartOffset: number;
          textEndOffset: number;
          confidence: number;
        }
      ];
    };
    userCorrection?: UserCorrection;
  };
}

export type ApiResponse = Record<string, any>;

export enum DocumentsActionTypes {
  DELETE_DOCUMENT = "@documents/DELETE_DOCUMENT",
  DELETE_DOCUMENT_SUCCESS = "@documents/DELETE_DOCUMENT_SUCCESS",
  FETCH_ANSWERS = "@documents/FETCH_ANSWERS",
  FETCH_ANSWERS_SUCCESS = "@documents/FETCH_ANSWERS_SUCCESS",
  FETCH_ERROR = "@documents/FETCH_ERROR",
  FETCH_METADATA = "@documents/FETCH_METADATA",
  FETCH_METADATA_SUCCESS = "@documents/FETCH_METADATA_SUCCESS",
  FETCH_REQUEST = "@documents/FETCH_REQUEST",
  FETCH_SUCCESS = "@documents/FETCH_SUCCESS",
  SELECTED = "@documents/SELECTED",
  STORE_DOCUMENT = "@documents/STORE_DOCUMENT",
  STORE_DOCUMENT_SUCCESS = "@documents/STORE_DOCUMENT_SUCCESS",
  UPDATE_METADATA = "@documents/UPDATE_METADATA",
  UPDATE_METADATA_SUCCESS = "@documents/UPDATE_METADATA_SUCCESS",
  CORRECT_ANSWER = "@documents/CORRECT_ANSWER",
  CORRECT_ANSWER_SUCCESS = "@documents/CORRECT_ANSWER_SUCCESS",
}

export interface DocumentsState {
  readonly data: Document[];
  readonly answers?: Answer;
  readonly document?: Document;
  readonly metadata?: Metadata;
  readonly errors?: string;
  readonly loading: boolean;
}
