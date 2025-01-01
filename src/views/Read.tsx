import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { db } from "@/lib/db";
import { EntryOptions } from "@/components/EntryOptions";

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
                    <Link to={"/"} viewTransition className="text-black"><ArrowLeft /></Link>
                    <EntryOptions id={Number(id)} />
                </div>
                <h2 className="text-2xl font-semibold text-brightblue">{title}</h2>
                <div className="flex flex-col gap-3 overflow-auto">
                    {updatedText &&
                        <>
                            <h2 className="italic text-gray-400">reframed</h2>
                            <p>
                                {updatedText}
                            </p>
                        </>

                    }
                    {updatedText &&
                        <hr className="h-px my-4 bg-gray-300 border-1 dark:bg-gray-700" />
                    }
                    <h2 className="italic text-gray-400">original</h2>
                    <p>
                        {text}
                    </p>

                </div>
            </div>
        </div>
    )
}
