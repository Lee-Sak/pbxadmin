import produce from "immer";

const initialState = {
  loading: false,
  error: false,
  success: false,
  pagination: {
    current: 1,
    pageSize: 5,
    total: 0,
  },
  data: [],
  direction: "DESC",
  column: "calldate",
};

export const GET_CDR_REQ = "GET_CDR_REQ";
export const GET_CDR_ERR = "GET_CDR_ERR";
export const GET_CDR_SUC = "GET_CDR_SUC";
export const SET_CDR = "SET_CDR";

export const getCdr = (params) => ({
  type: GET_CDR_REQ,
  params,
});

const cdr = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_CDR_REQ:
        draft.loading = true;
        draft.error = false;
        break;
      case GET_CDR_ERR:
        draft.loading = false;
        draft.error = true;
        draft.success = false;
        break;
      case GET_CDR_SUC:
        const { total, data } = action.data;
        draft.loading = false;
        draft.error = false;
        draft.success = true;
        draft.pagination.total = total;
        draft.data = data;
        break;
      case SET_CDR:
        const { current, pageSize, column, direction } = action.data;
        draft.pagination.current = current;
        draft.pagination.pageSize = pageSize;
        draft.column = column;
        draft.direction = direction;
        break;
      default:
        return state;
    }
  });

export default cdr;
