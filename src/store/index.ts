import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";

import documentsSaga from "./documents/sagas";
import { documentsReducer } from "./documents/reducer";
import { DocumentsState } from "./documents/types";

import playbooksSaga from "./playbooks/sagas";
import { playbooksReducer } from "./playbooks/reducer";
import { PlaybooksState } from "./playbooks/types";

export interface ApplicationState {
  documents: DocumentsState;
  playbooks: PlaybooksState;
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    documents: documentsReducer,
    playbooks: playbooksReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(documentsSaga), fork(playbooksSaga)]);
}
