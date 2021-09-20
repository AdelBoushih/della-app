import { Reducer } from "redux";
import { PlaybooksState, PlaybooksActionTypes } from "./types";

export const initialState: PlaybooksState = {
  data: [],
  errors: undefined,
  playbook: undefined,
  loading: false,
  query: "all",
};

const reducer: Reducer<PlaybooksState> = (state = initialState, action) => {
  switch (action.type) {
    case PlaybooksActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true, query: action.payload };
    }
    case PlaybooksActionTypes.FETCH_ONE_REQUEST: {
      return { ...state, loading: true };
    }
    case PlaybooksActionTypes.FETCH_ONE_REQUEST_SUCCESS: {
      return { ...state, loading: false, playbook: action.payload };
    }
    case PlaybooksActionTypes.DELETE_PLAYBOOK: {
      return { ...state, loading: true };
    }
    case PlaybooksActionTypes.DELETE_PLAYBOOK_SUCCESS: {
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
    case PlaybooksActionTypes.UPDATE_PLAYBOOK: {
      return { ...state, loading: true };
    }
    case PlaybooksActionTypes.UPDATE_PLAYBOOK_SUCCESS: {
      const newData = state.data.slice();
      const elementIndex = newData.findIndex(
        (elt) => elt.id === action.payload.id
      );
      newData[elementIndex] = action.payload;
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }

    case PlaybooksActionTypes.APPLY_PLAYBOOK: {
      return { ...state, loading: true };
    }

    case PlaybooksActionTypes.APPLY_PLAYBOOK_SUCCESS: {
      return { ...state, loading: true };
    }

    case PlaybooksActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case PlaybooksActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as playbooksReducer };
