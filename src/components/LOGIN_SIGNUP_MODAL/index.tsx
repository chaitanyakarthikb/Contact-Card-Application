import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

const Index = () => {
  const loginFields: string[] = ["Username", "Password"];
  const signupFields: string[] = ["Username", "Password", "Confirm Password"];

  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });

  const [signupState, setSignupState] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });

  const refactor = (field: string) => {
    let temp = field.toLowerCase();
    return temp.split(" ").join("");
  };

  const handleChange = (action: string, e: any, field: string) => {
    if (action.toLowerCase() === "login") {
      setLoginState((prev) => {
        return {
          ...prev,
          [refactor(field)]: e.target.value,
        };
      });
    } else {
      setSignupState((prev) => {
        return {
          ...prev,
          [refactor(field)]: e.target.value,
        };
      });
    }
  };

  const handleSubmit = async () => {
    if (isLogin) {
        if(loginState.username === "" || loginState.password === "") {
            alert("Please fill all the fields");
            return;
        }
      try {
        let apiResponse = await axios.post(
          "http://localhost:8080/api/user/login",
          {
            userName: loginState.username,
            password: loginState.password,
          },
        );
        alert(apiResponse.data);
      } catch (err) {
        console.error("API Error", err);
      }
      setLoginState({
        username: "",
        password: "",
      });
    } else {
        if(signupState.username === "" || signupState.password === "") {
            alert("Please fill all the fields");
            return;
        }
      if (signupState.password !== signupState.confirmpassword) {
        alert("Passwords do not match");
        return;
      } else {
        try {
          let apiResponse = await axios.post(
            "http://localhost:8080/api/user/signup",
            {
              userName: signupState.username,
              password: signupState.password,
            },
          );
          if (apiResponse.status !== 200) {
            alert("Signup failed");
            return;
          }

          if (apiResponse.status === 200) {
            alert("Signup successful");
            window.location.href = "/";
          }
        } catch (err) {
          console.error("API Error", err);
        }
      }
      setSignupState({
        username: "",
        password: "",
        confirmpassword: "",
      });
    }
  };

  const isLogin: boolean = window.location.href.includes("login");

  return (
    <div className="modal">
      <div className="heading" style={{ height: isLogin ? "30%" : "20%" }}>
        <h1>{isLogin ? "Login" : "Signup"} Form</h1>
      </div>

      <div className="forms">
        {isLogin &&
          loginFields.map((el: string) => {
            return (
              <input
                value={loginState[refactor(el) as keyof typeof loginState]}
                type={
                  el.toLowerCase().includes("password") ? "password" : "text"
                }
                onChange={(e) => handleChange("login", e, el)}
                placeholder={el}
              />
            );
          })}

        {!isLogin &&
          signupFields.map((el) => {
            return (
              <input
                value={signupState[refactor(el) as keyof typeof signupState]}
                type={
                  el.toLowerCase().includes("password") ? "password" : "text"
                }
                onChange={(e) => handleChange("signup", e, el)}
                placeholder={el}
              />
            );
          })}

        <button onClick={handleSubmit}>{isLogin ? "Login" : "Signup"}</button>
      </div>
    </div>
  );
};

export default Index;
