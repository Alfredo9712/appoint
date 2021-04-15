export const addID = (id) => async (dispatch, getState) => {
  dispatch({
    type: "INITIALIZE_ID",
    payload: {
      id,
    },
  });
  localStorage.setItem("companyId", id);
};
