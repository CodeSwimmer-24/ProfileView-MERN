import React, { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { userContext } from "./App";
function Logout() {
  const { state, dispatch } = useContext(userContext);

  const history = useHistory();
  const logout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        dispatch({ type: "USER", payload: false });
        history.push("login");
      });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    logout();
  }, []);
  return <div></div>;
}

export default Logout;
