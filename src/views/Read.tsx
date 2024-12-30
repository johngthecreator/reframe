import { BadgeCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { db } from "@/lib/db";

export default function Read() {
    const [searchParams] = useSearchParams();
    const [title, setTitle] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);
    const [updatedText, setUpdatedText] = useState<string | null>(null);
    const id = searchParams.get('e');

    const getEntries = async (id: number) => {
        db.entries.get(id)
            .then(entry => {
                if (!entry) return;
                setTitle(entry.title);
                setText(entry.text);
                setUpdatedText(entry.updatedText);
            })
    }

    useEffect(() => {
        if (id) {
            getEntries(Number(id));
        }
    }, [])


    return (
        <div className="w-full h-dvh md:p-5 flex justify-center">
            <div className="flex flex-col gap-3 w-full h-full md:w-[390px] md:h-full md:max-h-[844px] md:rounded-xl bg-offwhite overflow-hidden p-3">
                <div className="flex flex-row gap-3 justify-between items-center">
                    <h2 className="text-2xl font-semibold font-serif">Sappho.</h2>
                    <Link to={"/"} viewTransition className="px-5 py-1.5 font-semibold bg-gray-300 text-white rounded-full"><BadgeCheck /></Link>
                </div>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <div className="flex flex-col gap-3">
                    {updatedText &&
                        <>
                            <h2 className="italic text-gray-400">reframed</h2>
                            <div className="bg-white h-full p-3 text-ellipsis overflow-hidden rounded-xl">
                                <p className="line-clamp-5">
                                    {updatedText}
                                </p>
                            </div>
                        </>

                    }
                    {updatedText &&
                        <hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700" />
                    }
                    <h2 className="italic text-gray-400">original</h2>
                    <div className="bg-white h-full p-3 text-ellipsis overflow-hidden rounded-xl">
                        <p className="line-clamp-5">
                            {text}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
