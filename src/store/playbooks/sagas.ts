import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { Playbook, PlaybooksActionTypes } from "./types";
import {
  fetchError,
  fetchSuccess,
  fetchRequest,
  updatePlaybook,
  deletePlaybook,
  updatePlaybookSuccess,
  deletePlaybookSuccess,
  fetchOnePlaybookRequest,
  fetchOnePlaybookSuccess,
  applyPlaybook,
  applyPlaybookSuccess,
} from "./actions";
import { callApi } from "../../utils/api";
import { ErrorType } from "../../types";

function* handleFetch(action: ReturnType<typeof fetchRequest>) {
  try {
    const res: { data: { playbooks: Playbook[] } } & { error?: ErrorType } =
      yield call(callApi, "get", "playbooks/?" + action.payload);

    if (res.error) {
      yield put(fetchError(res.error.message));
    } else {
      yield put(fetchSuccess(res.data.playbooks));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Something went wrong."));
    }
  }
}

function* handleUpdatePlaybook(action: ReturnType<typeof updatePlaybook>) {
  console.log("Updating...");
  try {
    const res: { success: boolean; data: Playbook } & { error?: ErrorType } =
      yield call(
        callApi,
        "post",
        `playbooks/${action.payload.id}`,
        action.payload
      );

    if (res.error) {
      yield put(fetchError(res.error.message));
    } else {
      yield put(updatePlaybookSuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Something went wrong."));
    }
  }
}

function* handleApplyPlaybook(action: ReturnType<typeof applyPlaybook>) {
  try {
    console.log(`playbooks/${action.payload.playbookId}/assignToDocument`);
    const res: {
      success: boolean;
      data: { documentId: string; playbookId: string };
    } & { error?: ErrorType } = yield call(
      callApi,
      "post",
      `playbooks/${action.payload.playbookId}/assignToDocument`,
      { documentId: action.payload.documentId }
    );

    if (res.error) {
      yield put(fetchError(res.error.message));
    } else {
      yield put(applyPlaybookSuccess());
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Something went wrong."));
    }
  }
}

function* handleDeletePlaybook(action: ReturnType<typeof deletePlaybook>) {
  try {
    const res: { data: { id: string }; success: boolean } & {
      error?: ErrorType;
    } = yield call(callApi, "delete", `playbooks/${action.payload}`);

    if (res.error) {
      yield put(fetchError(res.error.message));
    } else {
      yield put(deletePlaybookSuccess(res.data.id));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Something went wrong."));
    }
  }
}

function* handleFetchOnePlaybook(
  action: ReturnType<typeof fetchOnePlaybookRequest>
) {
  try {
    const res: { data: Playbook } & { error?: ErrorType } = yield call(
      callApi,
      "get",
      "playbooks/" + action.payload
    );

    if (res.error) {
      yield put(fetchError(res.error.message));
    } else {
      yield put(fetchOnePlaybookSuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Something went wrong."));
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(PlaybooksActionTypes.FETCH_REQUEST, handleFetch);
}
function* watchFetchRequestOnePlaybook() {
  yield takeLatest(
    PlaybooksActionTypes.FETCH_ONE_REQUEST,
    handleFetchOnePlaybook
  );
}

function* watchApplyPlaybook() {
  yield takeLatest(PlaybooksActionTypes.APPLY_PLAYBOOK, handleApplyPlaybook);
}

function* watchUpdatePlaybook() {
  yield takeLatest(PlaybooksActionTypes.UPDATE_PLAYBOOK, handleUpdatePlaybook);
}
function* watchDeletePlaybook() {
  yield takeLatest(PlaybooksActionTypes.DELETE_PLAYBOOK, handleDeletePlaybook);
}

// `fork()` to multiple watchers.
function* playbooksSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchRequestOnePlaybook),
    fork(watchUpdatePlaybook),
    fork(watchDeletePlaybook),
    fork(watchApplyPlaybook),
  ]);
}

export default playbooksSaga;
