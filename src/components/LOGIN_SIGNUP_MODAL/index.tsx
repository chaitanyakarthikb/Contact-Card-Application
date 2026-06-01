import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { Constants } from "../../CONSTANTS";

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

  const [status,setStatus] = useState<String>("");

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
        setStatus("Loading...")
      try {
        let apiResponse = await axios.post(
          Constants.LOGIN_URL,
          {
            userName: loginState.username,
            password: loginState.password,
          },
        );
        if(apiResponse?.status === 200){
          setStatus("Login Success")
          let jwtToken = apiResponse?.data;
          localStorage.setItem("jwtToken", jwtToken);
            window.location.href = "/contacts";
        }
      } catch (err) {
        console.error("API Error", err);
        setStatus("Something went wrong")

      }
      setLoginState({
        username: "",
        password: "",
      });
    } else {
        setStatus("Loading...")
        if(signupState.username === "" || signupState.password === "") {
            setStatus("Please fill all the fields");
            return;
        }
      if (signupState.password !== signupState.confirmpassword) {
            setStatus("Please fill all the fields");
        return;
      } else {
        try {
          let apiResponse = await axios.post(
            Constants.SIGNUP_URL,
            {
              userName: signupState.username,
              password: signupState.password,
            },
          );
          if (apiResponse.status !== 200) {
            setStatus("Signup Failed");
            return;
          }

          if (apiResponse.status === 200) {
            setStatus("Signup Success");
              window.location.href = "/";
          }
        } catch (err) {
          console.error("API Error", err);
          setStatus("Something went wrong");
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

  useEffect(()=>{
    setTimeout(()=>{
      setStatus("");
    },2000);

  },[status])

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
          {
            status.length > 0 && <div className="status--message">{status}</div>
          }
          

        <button onClick={handleSubmit}>{isLogin ? "Login" : "Signup"}</button>
      </div>
    </div>
  );
};

export default Index;
