import requestBody from "../../Components/RequestBody/RequestFunction";

export const fetchAccountSummary = (
  clientId = "NBS%2F697591974-VN%2F0",
  date = "2022-01-05",
  accountId = "16"
) => {
  return async (dispatch) => {
    const body = `client?action=getClientAccountSummary&format=json&exchange=CSE&account=${clientId}&broker=NDB&accStmtdate=${date}&clientAnctId=${accountId}`;
    const response = await requestBody("GET", link, body, "", {});

    dispatch({
      type: type,
      payload,
    });
  };
};

export const fetchAccountSummary = (
  clientId = "NBS%2F697591974-VN%2F0",
  date = "2022-01-05",
  accountId = "16"
) => {
  return async (dispatch) => {
    const body = `client?action=getClientAccountSummary&format=json&exchange=CSE&account=${clientId}&broker=NDB&accStmtdate=${date}&clientAnctId=${accountId}`;
    const response = await requestBody("GET", link, body, "", {});

    dispatch({
      type: type,
      payload,
    });
  };
};
