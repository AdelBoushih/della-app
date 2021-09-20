import { action } from "typesafe-actions";
import { Answer, TextSelection } from "../../types/Answer";
import { DocumentsActionTypes, Document, Metadata } from "./types";

export const fetchRequest = () => action(DocumentsActionTypes.FETCH_REQUEST);
export const fetchMetadataRequest = (documentId: string) =>
  action(DocumentsActionTypes.FETCH_METADATA, documentId);

export const storeDocument = (formData: FormData) =>
  action(DocumentsActionTypes.STORE_DOCUMENT, formData);
export const storeDocumentSuccess = (document: Document) =>
  action(DocumentsActionTypes.STORE_DOCUMENT_SUCCESS, document);

export const deleteDocument = (documentId: string) =>
  action(DocumentsActionTypes.DELETE_DOCUMENT, documentId);
export const deleteDocumentSuccess = (documentId: string) =>
  action(DocumentsActionTypes.DELETE_DOCUMENT_SUCCESS, documentId);

export const fetchAnswers = (documentId: string) =>
  action(DocumentsActionTypes.FETCH_ANSWERS, documentId);
export const fetchAnswersSuccess = (answers: Answer) =>
  action(DocumentsActionTypes.FETCH_ANSWERS_SUCCESS, answers);

export const updateMetadata = (payload: {
  documentId: string;
  corrections: { key: string; value: unknown }[];
}) => action(DocumentsActionTypes.UPDATE_METADATA, payload);
export const updateMetadataSuccess = (metadata: Metadata) =>
  action(DocumentsActionTypes.UPDATE_METADATA_SUCCESS, metadata);

export const correctAnswer = (payload: {
  documentId: string;
  questionId: string;
  userTextSelections: TextSelection[];
  comment?: string;
  exception?: boolean;
}) => action(DocumentsActionTypes.CORRECT_ANSWER, payload);
export const correctAnswerSuccess = () =>
  action(DocumentsActionTypes.CORRECT_ANSWER_SUCCESS);

export const fetchSuccess = (data: Document[]) =>
  action(DocumentsActionTypes.FETCH_SUCCESS, data);
export const fetchMetadataSuccess = (data: Metadata) =>
  action(DocumentsActionTypes.FETCH_METADATA_SUCCESS, data);

export const fetchError = (message: string) =>
  action(DocumentsActionTypes.FETCH_ERROR, message);
