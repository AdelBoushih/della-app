export interface Playbook extends ApiResponse {
  created: string;
  createdBy: string;
  description?: string;
  id: string;
  language: string;
  name: string;
  sections: Section[];
}

export interface Section {
  fields: Field[];
  id: string;
  name: string;
}

export interface Field {
  exceptionIf?: string;
  id: string;
  instructions?: string;
  label?: string;
  normalization?: string;
  question: string;
}

export type ApiResponse = Record<string, any>;

export enum PlaybooksActionTypes {
  FETCH_REQUEST = "@playbooks/FETCH_REQUEST",
  FETCH_SUCCESS = "@playbooks/FETCH_SUCCESS",
  FETCH_ONE_REQUEST = "@playbooks/FETCH_ONE_REQUEST",
  FETCH_ONE_REQUEST_SUCCESS = "@playbooks/FETCH_ONE_REQUEST_SUCCESS",
  DELETE_PLAYBOOK = "@playbooks/DELETE_PLAYBOOK",
  DELETE_PLAYBOOK_SUCCESS = "@playbooks/DELETE_PLAYBOOK_SUCCESS",
  UPDATE_PLAYBOOK = "@playbooks/UPDATE_PLAYBOOK",
  UPDATE_PLAYBOOK_SUCCESS = "@playbooks/UPDATE_PLAYBOOK_SUCCESS",

  APPLY_PLAYBOOK = "@playbooks/APPLY_PLAYBOOK",
  APPLY_PLAYBOOK_SUCCESS = "@playbooks/APPLY_PLAYBOOK_SUCCESS",

  FETCH_ERROR = "@playbooks/FETCH_ERROR",
}

export interface PlaybooksState {
  readonly loading: boolean;
  readonly data: Playbook[];
  readonly playbook?: Playbook;
  readonly errors?: string;
  readonly query?: string;
}
