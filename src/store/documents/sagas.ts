import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  Document,
  DocumentsActionTypes,
  DocumentStatus,
  Metadata,
} from "./types";
import {
  fetchError,
  fetchSuccess,
  fetchRequest,
  storeDocumentSuccess,
  storeDocument,
  updateMetadata,
  deleteDocument,
  updateMetadataSuccess,
  deleteDocumentSuccess,
  fetchMetadataRequest,
  fetchMetadataSuccess,
  fetchAnswersSuccess,
  fetchAnswers,
  correctAnswer,
} from "./actions";
import { callApi } from "../../utils/api";
import { ErrorType } from "../../types";
import { Answer } from "../../types/Answer";

function* handleFetch(action: ReturnType<typeof fetchRequest>) {
  try {
    const res: { data: { documents: Document[] } } & { error?: ErrorType } =
      yield call(callApi, "get", "documents");

    if (res.error) {
      yield put(fetchError(res.error.message));
    } else {
      yield put(fetchSuccess(res.data.documents));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Something went wrong."));
    }
  }
}

function* handleFetchAnswers(action: ReturnType<typeof fetchAnswers>) {
  try {
    const res: { data: { answers: Answer } } & { error?: ErrorType } =
      yield call(callApi, "get", `documents/${action.payload}/answers`);
    if (res.error) {
      yield put(fetchError(res.error.message));
    } else {
      yield put(fetchAnswersSuccess(res.data.answers));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Something went wrong."));
    }
  }
}

function* handleCorrectAnswer(action: ReturnType<typeof correctAnswer>) {
  try {
    const res: { data: Document; success: boolean } & { error?: ErrorType } =
      yield call(
        callApi,
        "post",
        `documents/${action.payload.documentId}/correctAnswer`,
        {
          questionId: action.payload.questionId,
          textSelections: action.payload.userTextSelections,
          comment: action.payload.comment,
          exception: action.payload.exception,
        }
      );

    if (res.error) {
      yield put(fetchError(res.error.message));
    } else {
      yield put(storeDocumentSuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Something went wrong."));
    }
  }
}

function* handleStoreDocument(action: ReturnType<typeof storeDocument>) {
  try {
    const res: { data: Document; success: boolean } & { error?: ErrorType } =
      yield call(callApi, "post", "documents/upload", action.payload, true);

    if (res.error) {
      yield put(fetchError(res.error.message));
    } else {
      yield put(storeDocumentSuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Something went wrong."));
    }
  }
}

function* handleUpdateDocument(action: ReturnType<typeof updateMetadata>) {
  try {
    const res: {
      data: {
        documentId: string;
        documentStatus: DocumentStatus;
        metadata: Metadata;
      };
    } & { error?: ErrorType } = yield call(
      callApi,
      "post",
      `documents/${action.payload.documentId}/correctMetadata`,
      { corrections: action.payload.corrections }
    );

    if (res.error) {
      yield put(fetchError(res.error.message));
    } else {
      console.log(res);
      yield put(updateMetadataSuccess(res.data.metadata));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Something went wrong."));
    }
  }
}

function* handleDeleteDocument(action: ReturnType<typeof deleteDocument>) {
  try {
    const res: string & { error?: ErrorType } = yield call(
      callApi,
      "delete",
      `documents/${action.payload}`
    );

    if (res.error) {
      yield put(fetchError(res.error.message));
    } else {
      yield put(deleteDocumentSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Something went wrong."));
    }
  }
}

function* handleFetchMetadata(action: ReturnType<typeof fetchMetadataRequest>) {
  try {
    const res: {
      data: {
        documentId: string;
        documentStatus: DocumentStatus;
        metadata: Metadata;
      };
    } & { error?: ErrorType } = yield call(
      callApi,
      "get",
      `documents/${action.payload}/metadata`
    );

    if (res.error) {
      yield put(fetchError(res.error.message));
    } else {
      yield put(fetchMetadataSuccess(res.data.metadata));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Something went wrong."));
    }
  }
}

function* watchFetchAnswersRequest() {
  yield takeLatest(DocumentsActionTypes.FETCH_ANSWERS, handleFetchAnswers);
}

function* watchCorrectAnswer() {
  yield takeLatest(DocumentsActionTypes.CORRECT_ANSWER, handleCorrectAnswer);
}

function* watchFetchRequest() {
  yield takeEvery(DocumentsActionTypes.FETCH_REQUEST, handleFetch);
}
function* watchFetchRequestOneDocument() {
  yield takeLatest(DocumentsActionTypes.FETCH_METADATA, handleFetchMetadata);
}
function* watchStoreDocument() {
  yield takeLatest(DocumentsActionTypes.STORE_DOCUMENT, handleStoreDocument);
}

function* watchUpdateDocument() {
  yield takeLatest(DocumentsActionTypes.UPDATE_METADATA, handleUpdateDocument);
}
function* watchDeleteDocument() {
  yield takeLatest(DocumentsActionTypes.DELETE_DOCUMENT, handleDeleteDocument);
}

// `fork()` to multiple watchers.
function* documentsSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchRequestOneDocument),
    fork(watchStoreDocument),
    fork(watchUpdateDocument),
    fork(watchDeleteDocument),
    fork(watchFetchAnswersRequest),
    fork(watchCorrectAnswer),
  ]);
}

export default documentsSaga;
