import { useEffect, useState } from "react"
import "./index.css"

const Index = () => {
    const loginFields: string[] = ["Username", "Password"]
    const signupFields: string[] = ["Username", "Password", "Confirm Password"]

    const [loginState, setLoginState] = useState({
        username: "",
        password: "",
    })

    const [signupState, setSignupState] = useState({
        username: "",
        password: "",
        confirmpassword: ""

    })

    const refactor = (field: string) => {
        let temp = field.toLowerCase();
        return temp.split(" ").join("");
    }

    const handleChange = (action: string, e: any, field: string) => {
        if (action.toLowerCase() === "login") {
            setLoginState((prev) => {
                return {
                    ...prev,
                    [refactor(field)]: e.target.value,
                }

            })

        } else {
            setSignupState((prev) => {
                return {
                    ...prev,
                    [refactor(field)]: e.target.value,
                }

            })

        }
    }

    useEffect(() => {
        console.log("===========loginFields", loginState);
        console.log("===========signupFields", signupState);
    }, [loginState, signupState])

    const handleSubmit = () => {
        if (isLogin) {
            console.log("===================LOGIN STATE", loginState);
            setLoginState({
                username: "",
                password: "",
            })
        } else {
            console.log("===================SIGNUP STATE", signupState);
            if(signupState.password !== signupState.confirmpassword){
                alert("Passwords do not match");
                return;
            }else{
                alert("Signup Succesful");
            }
            setSignupState({
                username: "",
                password: "",
                confirmpassword: ""
            })
        }


    }

    const isLogin: boolean = window.location.href.includes("login");

    return (
        <div className="modal">
            <div className="heading" style={{ "height": isLogin ? "30%" : "20%" }}>
                <h1>{isLogin ? "Login" : "Signup"} Form</h1>
            </div>

            <div className="forms">
                {isLogin && loginFields.map((el: string) => {
                    return <input value={loginState[refactor(el) as keyof typeof loginState]} type={el.toLowerCase().includes("password") ? "password" : "text"} onChange={(e) => handleChange("login", e, el)} placeholder={el} />
                })}

                {!isLogin && signupFields.map((el) => {
                    return <input value={signupState[refactor(el) as keyof typeof signupState]} type={el.toLowerCase().includes("password") ? "password" : "text"} onChange={(e) => handleChange("signup", e, el)} placeholder={el} />
                })}

                <button onClick={handleSubmit}>{isLogin ? "Login" : "Signup"}</button>
            </div>
        </div>
    )
}

export default Index
