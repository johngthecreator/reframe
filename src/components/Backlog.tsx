import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Moon } from "lucide-react";
import { db } from "../lib/db.ts";
import { useLiveQuery } from "dexie-react-hooks";
import { X } from "lucide-react";
import BacklogCard from "./BacklogCard.tsx";

export default function Backlog() {
	const entries = useLiveQuery(() => db.entries.where('sentiment').equals(1).toArray());
	return (
		<Dialog>
			<DialogTrigger asChild>
				<button className="p-5 py-1.5 font-semibold bg-gray-300 text-xs text-white rounded-full">
					<Moon />
				</button>
			</DialogTrigger>
			<DialogContent
				className="w-11/12 h-5/6 rounded-lg flex flex-col justify-left bg-offwhite">
				<div className="flex flex-row justify-between items-center">
					<DialogTitle className="text-2xl font-semibold">Waning.</DialogTitle>
					<DialogTrigger asChild>
						<button><X /></button>
					</DialogTrigger>
				</div>
				<p className="text-gray-400 italic">
					Like the waning moon, we release our dark thoughts to make room for light.
				</p>
				<div className="h-full overflow-auto mt-2 space-y-3 rounded-xl">
					{entries && entries.map(entry => {
						return <BacklogCard id={entry.id} title={entry.title} text={entry.text} />
					})}
					{(entries && entries.length == 0) &&
						<div className="h-1/2 flex justify-center items-center font-bold text-center">
							<p>All your dark thoughts have <br /> been released.</p>
						</div>
					}
				</div>
			</DialogContent>
		</Dialog >
	)
}
