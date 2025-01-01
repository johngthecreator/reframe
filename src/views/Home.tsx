import { Pencil, Cog } from "lucide-react";
import { Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import EntryCard from "../components/EntryCard.tsx";
import Backlog from "../components/Backlog.tsx";
import { db } from "../lib/db.ts";

export default function Home() {
    const entries = useLiveQuery(() => db.entries.where('sentiment').equals(0).toArray());
    return (
        <div className="w-full h-dvh md:p-5 flex justify-center">
            <div className="relative w-full h-full md:w-[390px] md:h-full md:max-h-[844px] md:rounded-xl bg-offwhite overflow-hidden">
                <div className="flex flex-row justify-between items-center p-3">
                    <h2 className="text-2xl font-semibold text-brightblue">Sappho.</h2>
                    <div className="flex flex-row gap-3">
                        <Backlog />
                        <Link to={"/settings"} viewTransition className="shrink-0 p-1.5 font-semibold bg-white hover:brightness-95 duration-300 ease-in-out text-xs text-black rounded-full">
                            <Cog />
                        </Link>
                    </div>
                </div>
                <div className="h-full overflow-auto mx-3 mt-2 space-y-3 rounded-xl">
                    {entries && entries.map(entry => {
                        if (entry.updatedText) {
                            return <EntryCard id={entry.id} title={entry.title} text={entry.updatedText} />
                        } else {
                            return <EntryCard id={entry.id} title={entry.title} text={entry.text} />
                        }
                    })}
                    {(entries && entries.length == 0) &&
                        <div className="h-1/2 flex justify-center items-center font-bold text-center">
                            <p>Your mind is empty. Write down all <br /> your thoughts and feelings</p>
                        </div>
                    }
                    <div className="bg-transparent p-10">
                    </div>
                </div>
                <div className="z-10 absolute bottom-0 bg-transparent w-full p-3 flex justify-end">
                    <Link to={"/write"} viewTransition className=" p-4 font-bold bg-normblue text-white hover:brightness-95 duration-300 ease-in-out rounded-full"><Pencil /></Link>
                </div>
            </div>
        </div>
    )
}
