import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Settings() {
    const pass = localStorage.getItem('password');
    const passHint = localStorage.getItem('hint');
    const [password, setPassword] = useState<string>(pass ? pass : "");
    const [hint, setHint] = useState<string>(passHint ? passHint : "");
    const [needsUpdate, setNeedsUpdate] = useState<boolean>(true);
    const updatePassword = () => {
        if (password.length > 0) {
            localStorage.setItem("password", password);
            setNeedsUpdate(false);
        }
    }

    const updateHint = () => {
        if (hint.length > 0) {
            localStorage.setItem("hint", hint);
            setNeedsUpdate(false);
        }
    }
    return (
        <div className="w-full h-dvh md:p-5 flex justify-center">
            <div className="relative w-full h-full md:w-[390px] md:h-full md:max-h-[844px] md:rounded-xl bg-offwhite overflow-hidden">
                <div className="flex flex-row gap-3 items-center p-3">
                    <Link to={"/"} viewTransition className="shrink-0 font-semibold text-xs text-black rounded-full">
                        <ArrowLeft />
                    </Link>
                    <h2 className="text-2xl font-semibold text-brightblue">Settings</h2>
                </div>
                <div className="p-3 flex flex-col gap-2">
                    <h2 className="text-lg text-brightblue font-semibold">Lockscreen</h2>
                    <p className="text-gray-400">Here you can manage all settings related to the lockscreen.</p>
                    <h2 className="text-normblue font-medium">Current Password</h2>
                    <div className="w-full flex flex-row gap-3 duration-300 ease-in-out">
                        <input type="text" className="w-full p-2 rounded outline outline-brightblue" value={password} onChange={e => {
                            setPassword(e.target.value);
                            if (!needsUpdate) setNeedsUpdate(true);
                        }} />
                        {(pass != password && needsUpdate) &&
                            <button className="px-5 py-1.5 bg-brightblue rounded-full text-white" onClick={updatePassword}>Update</button>
                        }
                    </div>
                    <h2 className="text-normblue font-medium">Password Hint</h2>
                    <div className="w-full flex flex-row gap-3 duration-300 ease-in-out">
                        <input type="text" className="w-full p-2 rounded outline outline-brightblue" value={hint} onChange={e => {
                            setHint(e.target.value);
                            if (!needsUpdate) setNeedsUpdate(true);
                        }} />
                        {(passHint != hint && needsUpdate) &&
                            <button className="px-5 py-1.5 bg-brightblue rounded-full text-white" onClick={updateHint}>Update</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
