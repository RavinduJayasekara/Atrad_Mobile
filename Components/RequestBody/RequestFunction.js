const requestBody = async (method, link, action, body, headers) => {
  try {
    const response = await fetch(link + action, {
      method: method,
      headers: headers,
      body: body,
    });
    if (response.status === 200) {
      const resData = await response.text();
      const replaceString = resData.replace(/'/g, '"');
      const data = JSON.parse(replaceString);
      return {
        data: data,
        status: response.status,
        statusMessage: null,
      };
    } else {
      return {
        data: {},
        status: response.status,
        statusMessage: response.statusText,
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default requestBody;
