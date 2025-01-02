import { useEffect, useState } from "react";
import { useAtom } from "jotai/react";
import { lockscreenAtom } from "./lockscreenAtom";
import { useNavigate, Outlet } from "react-router-dom";
export default function LockWrapper() {
  const [isUnlocked, setIsUnlocked] = useAtom(lockscreenAtom);
  const [password, setPassword] = useState<string>("");
  const currPassword = localStorage.getItem("password");
  const currHint = localStorage.getItem("hint");
  const [needHint, setNeedHint] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        setIsUnlocked(false);
      }
    }

    setTimeout(() => {
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, 60000)
  }, [navigate]);

  const unlock = () => {
    if (currPassword != null && currPassword == password) {
      setIsUnlocked(true);
    };

    if (currPassword == null) {
      setIsUnlocked(true);
    };

    setNeedHint(true);
  }

  return (
    <div className="relative">
      <div className={`w-full h-full flex flex-col items-center justify-center gap-4 absolute z-40 top-0 left-0 bg-offwhite${isUnlocked ? " hidden" : ""}`}>
        {currPassword ? (
          <>
            <input name="password" onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter your password" className="border-b-2 border-solid rounded-none border-brightblue text-xl py-2 text-center text-gray-400 bg-transparent outline-none" autoComplete="off" autoCorrect="off" />
            {needHint &&
              <p className="text-gray-500 font-thin">Hint: {currHint}</p>
            }
          </>
        ) : (
          <h2 className="text-xl font-medium">Press unlock to open Sappho.</h2>
        )}
        <button className="px-5 py-1.5 bg-normblue rounded-full font-medium text-xl text-white hover:brightness-95" onClick={unlock}> Unlock </button>
      </div>
      <Outlet />
    </div>
  )
}
