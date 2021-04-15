const id = localStorage.getItem("companyId");

export function companyID(state = id, action) {
  switch (action.type) {
    case "INITIALIZE_ID":
      return (state = action.payload.id);
    default:
      return state;
  }
}
