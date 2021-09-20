import { Reducer } from "redux";
import { DocumentsState, DocumentsActionTypes } from "./types";

export const initialState: DocumentsState = {
  answers: undefined,
  data: [],
  document: undefined,
  errors: undefined,
  loading: false,
  metadata: undefined,
};

const reducer: Reducer<DocumentsState> = (state = initialState, action) => {
  switch (action.type) {
    case DocumentsActionTypes.FETCH_REQUEST: {
      console.log("test2");
      return { ...state, loading: true, query: action.payload };
    }
    case DocumentsActionTypes.FETCH_METADATA: {
      return { ...state, loading: true };
    }
    case DocumentsActionTypes.FETCH_METADATA_SUCCESS: {
      return { ...state, loading: false, metadata: action.payload };
    }

    case DocumentsActionTypes.FETCH_ANSWERS: {
      return { ...state, loading: true };
    }
    case DocumentsActionTypes.FETCH_ANSWERS_SUCCESS: {
      return { ...state, loading: false, answers: action.payload };
    }

    case DocumentsActionTypes.CORRECT_ANSWER: {
      return { ...state, loading: true };
    }
    case DocumentsActionTypes.CORRECT_ANSWER_SUCCESS: {
      return { ...state, loading: false };
    }

    case DocumentsActionTypes.DELETE_DOCUMENT: {
      return { ...state, loading: true };
    }
    case DocumentsActionTypes.DELETE_DOCUMENT_SUCCESS: {
      var newData = state.data.slice();
      const elementIndex = newData.findIndex(
        (elt) => elt.id === action.payload
      );
      newData.splice(elementIndex, 1);
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case DocumentsActionTypes.UPDATE_METADATA: {
      return { ...state, loading: true };
    }
    case DocumentsActionTypes.UPDATE_METADATA_SUCCESS: {
      return { ...state, loading: false };
    }
    case DocumentsActionTypes.STORE_DOCUMENT: {
      return { ...state, loading: true };
    }
    case DocumentsActionTypes.STORE_DOCUMENT_SUCCESS: {
      const documents = state.data.slice();
      documents.unshift(action.payload);
      return {
        ...state,
        loading: false,
        data: documents,
      };
    }
    case DocumentsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case DocumentsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as documentsReducer };
