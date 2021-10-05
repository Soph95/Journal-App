async function onSubmit(url, username, password, onLogin, setErrorMsg) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const { jwt, userId } = await response.json();
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("userId", userId.toString());
    onLogin();
  } else {
    setErrorMsg(true);
  }
}

export default onSubmit;
