import { ChangeEvent, useState } from "react"
import { useSession } from "../../../../../../assets/shared/wrappers/SessionWrapper";
import { useTitle } from "../../../../../../lib/utils/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSession } from "../../../../../../assets/redux/session/sessionReducer";
import UserInfo from "../../../../../../lib/api/user/UserInfo";
import NewInput from "../../shared/newInput";
import SaveAndCancel from "../../shared/saveCancel";

type FullNameType = {
    fname:string;
    lname:string;
}

export default function ProfileName() {
    const {session} = useSession()
    const router = useNavigate()
    const dispatch = useDispatch()
    const [fullName,setFullName] = useState<FullNameType>(
        {
            fname:session.firstname,lname:session.lastname
        }
    )
    const [errors,setErrors] = useState<FullNameType>(
        {
            fname:"",lname:""
        }
    )
    const {fname,lname} = fullName


    const [loading,setLoading] = useState<boolean>(false)


    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setFullName(prev => ({...prev,[name]:value}))
        setErrors(prev => ({...prev,[name]:""}))
    }
    
    const disabled = (fname.length ==0 || lname.length==0)|| (fname === session.firstname && lname == session.lastname) || loading


    const handleSave = async() => {
        if(disabled) return
        setLoading(true)
        const res= await new UserInfo(session.uid).updateFullName(fullName)
        if(res?.success) {
            setLoading(false)
            dispatch(updateSession({...session,
                    firstname:fname,
                    lastname:lname}))
            router("/profile/info")
        } else {
            setLoading(false)
            setErrors(res?.errors as any)
        }
    }

    useTitle("Name")
    return (
        <>
            <div className="flex justify-center items-center dark:text-white">
                <div className="flex flex-col gap-1 items-center">
                    <h1 className="font-semibold text-3xl capitalize mt-4">Name</h1>
                </div>
            </div>
            <div className="mt-10 max-w-[700px] mx-auto">
                <div className="md:p-4 md:border rounded-lg md:border-black/20 md:dark:border-white/20 md:shadow-md md:px-8">
                    <p className=" text-black/80 dark:text-white/80">Here you can change your first name and last name</p>
                    <div className="flex flex-col gap-10 mt-6">
                        <NewInput
                        value={fname}
                        name="fname"
                        error={errors.fname}
                        placeHolder="First name"
                        handleChange={handleChange} />
                        <NewInput
                        value={lname}
                        name="lname"
                        error={errors.lname}
                        placeHolder="Last name"
                        handleChange={handleChange} />
                    </div>
                    <SaveAndCancel 
                    loading={loading}
                    handleSave={handleSave}
                    disabled={disabled}/>
                </div>
            </div>
        </>
    )
}