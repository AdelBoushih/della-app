import { action } from "typesafe-actions";
import { PlaybooksActionTypes, Playbook } from "./types";

export const fetchRequest = (query: string) =>
  action(PlaybooksActionTypes.FETCH_REQUEST, query);
export const fetchOnePlaybookRequest = (query: string) =>
  action(PlaybooksActionTypes.FETCH_ONE_REQUEST, query);

export const deletePlaybook = (playbookId: string) =>
  action(PlaybooksActionTypes.DELETE_PLAYBOOK, playbookId);
export const deletePlaybookSuccess = (playbookId: string) =>
  action(PlaybooksActionTypes.DELETE_PLAYBOOK_SUCCESS, playbookId);

export const updatePlaybook = (playbook: Playbook) =>
  action(PlaybooksActionTypes.UPDATE_PLAYBOOK, playbook);
export const updatePlaybookSuccess = (playbook: Playbook) =>
  action(PlaybooksActionTypes.UPDATE_PLAYBOOK_SUCCESS, playbook);

export const fetchSuccess = (data: Playbook[]) =>
  action(PlaybooksActionTypes.FETCH_SUCCESS, data);
export const fetchOnePlaybookSuccess = (data: Playbook) =>
  action(PlaybooksActionTypes.FETCH_ONE_REQUEST_SUCCESS, data);

export const applyPlaybook = (payload: {
  playbookId: string;
  documentId: string;
}) => action(PlaybooksActionTypes.APPLY_PLAYBOOK, payload);
export const applyPlaybookSuccess = () =>
  action(PlaybooksActionTypes.UPDATE_PLAYBOOK_SUCCESS);

export const fetchError = (message: string) =>
  action(PlaybooksActionTypes.FETCH_ERROR, message);
