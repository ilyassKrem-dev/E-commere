import { ChangeEvent, FormEvent,  useState } from "react"
import { Link } from "react-router-dom";

import { loginType } from "../../../lib/utils/types/authTypes";
import { validateLogin } from "../../../lib/utils/validation/validationAuth";



export default function Login() {
    const [info,setInfo] = useState<loginType>({
        email:"",password:""
    })
    const [errors,setErros] = useState<loginType>({
        email:"",password:""
    })
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        if(errors.email) setErros(prev => ({...prev,email:""}))
        
        if(errors.password) setErros(prev => ({...prev,password:""}))
        
        setInfo(prev => ({...prev,[name]:value}))
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const check = validateLogin(info)
        if(!check.success) {
            return setErros(check.errors)
        }

    }
   
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-10">
            <div className="flex flex-col gap-1">
                <input type="text" 
                name="email" 
                id="email" 
                className={`${errors.email ? "border-accent":""}`} 
                value={info.email}
                onChange={handleChange}
                placeholder="Email" />
                <p className="h-[10px] text-sm text-accent">{errors.email}</p>
            </div>
            <div className="flex flex-col gap-1">
                <input 
                type="password" 
                name="password" 
                id="password"
                value={info.password}
                onChange={handleChange}
                className={`${errors.password ? "border-accent":""}`} 
                placeholder="Password" />
                <p className="h-[10px] text-sm text-accent">{errors.password}</p>
            </div>
            <div className="flex flex-col gap-3 mt-5">
                <button className="bg-black rounded-lg py-2 w-full text-white font-semibold text-sm active:scale-95 transition-all duration-300 hover:bg-black/70">Sign In</button>
                <Link to={"/auth/signup"}>
                    <button className="bg-white border-blue-400 text-blue-400 rounded-lg py-2 w-full border font-semibold text-sm hover:bg-blue-200/60 transition-all duration-300 active:scale-95">Register Now</button>
                </Link>
                <Link to={"/auth/signup"} className="text-sm text-blue-500 font-bold self-end active:scale-95">Forget Password?</Link>
            </div>
        </form>
    )
    
}