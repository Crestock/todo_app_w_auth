import * as actions from "../actions/actionTypes";

const initialState = {
  error: null,
  loading: false,
  deleteQuery: {
    error: null,
    loading: false
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_QUERY_START:
      return { ...state, loading: true };

    case actions.ADD_QUERY_SUCCESS:
      return { ...state, loading: false, error: false };

    case actions.ADD_QUERY_FAIL:
      return { ...state, loading: false, error: payload };

    case actions.DELETE_QUERY_START:
      return { ...state, deleteQuery: { ...state.deleteQuery, loading: true } };

    case actions.DELETE_QUERY_SUCCESS:
      return {
        ...state,
        deleteQuery: { ...state.deleteQuery, loading: false, error: false }
      };

    case actions.DELETE_QUERY_FAIL:
      return {
        ...state,
        deleteQuery: { ...state.deleteQuery, loading: false, error: payload }
      };

    default:
      return state;
  }
};
