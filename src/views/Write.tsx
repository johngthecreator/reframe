import { X } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { LoaderCircle, Check } from "lucide-react";
import NegEntry from "../components/NegEntry.tsx";
import { db } from "../lib/db.ts";
import { ModelLoadStatus } from "@/lib/ModelLoadStatus.ts";

export default function Write() {
    const [params] = useSearchParams();
    const id = params.get('id') || null;
    const rf = params.get('rf') || false;

    const worker = useRef<Worker | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [entry, setEntry] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [label, setLabel] = useState<number | null>(null);
    const navigate = useNavigate();

    const insertEntry = async () => {
        await db.entries.add({
            title: title ? title : "Musings",
            text: entry,
            updatedText: null,
            sentiment: label
        });
    }

    useEffect(() => {

        const updateEntry = async () => {
            await db.entries.update(Number(id), { title: title ? title : "Musings", sentiment: label, updatedText: entry })
            navigate("/");
        }

        if (rf && id && (label == 0)) {
            updateEntry();
        } else {
            console.log("not postitive");
        }

        if (!id && (label != null)) {
            insertEntry();
            if (label == 1) {
                setOpen(true);
            } else if (label == 0) {
                navigate("/");
            }
        }
    }, [label])


    useEffect(() => {
        if (rf && id) {
            getEntry(Number(id));
        }

        if (worker && !worker.current) {
            worker.current = new Worker(new URL('../worker.js', import.meta.url), {
                type: 'module'
            });
        }

        const onMessageReceived = async (e: ModelLoadStatus) => {
            if (e.data.status == 'complete') {
                setLoading(false);
                console.log(e.data.output);
                const currLabel = (e.data.output[0]['label'] == 'negative') ? 1 : 0
                console.log(currLabel);
                if (currLabel == 1) {
                    setLabel(currLabel);
                } else if (currLabel == 0) {
                    setLabel(currLabel);
                }
            }
            console.log(e.data)
        }

        worker.current?.addEventListener('message', onMessageReceived);
        return () => worker.current?.removeEventListener('message', onMessageReceived);
    }, [])


    const getEntry = async (rfId: number) => {
        db.entries.get(rfId)
            .then(entry => {
                if (!entry) { console.log("no entry"); return; };
                setEntry(entry.text);
                console.log(entry.title);
                setTitle(entry.title);
            })
            .catch(error => console.error(error))
    }



    const classify = useCallback(async (text: string) => {
        if (worker.current) {
            worker.current.postMessage({ text });
            setLoading(true);
        }
    }, []);

    return (
        <div className="w-full h-dvh md:p-5 flex justify-center">
            <div className="flex flex-col gap-3 w-full h-full md:w-[390px] md:h-full md:max-h-[844px] md:rounded-xl bg-offwhite overflow-hidden p-3">
                <div className="flex flex-row gap-3 justify-between items-center">
                    <Link to={"/"} viewTransition><X className="text-black" /></Link>
                    <p className="px-5 py-1.5 font-semibold text-mutedgray rounded-full">{(rf && id) ? <span className="text-xl">reframing &#129782;</span> : <span className="text-xl">writing &#9999;</span>}</p>
                    <button onClick={() => classify(entry)} className="text-brightblue">{loading ? <LoaderCircle className="animate-spin" /> : <Check />}</button>
                </div>
                <div className="h-full flex flex-col gap-2 p-3 rounded-xl bg-white">
                    <input onChange={(e) => setTitle(e.target.value)} value={title ? title : ""} type="text" placeholder="Title" className="text-2xl focus:outline-none" />

                    <textarea onChange={(e) => setEntry(e.target.value)} value={entry} className="bg-white h-full w-full rounded-xl resize-none focus:outline-none" placeholder="what's on your mind?" />
                </div>
            </div>
            <NegEntry open={open} setOpen={setOpen} />
        </div>
    )
}
