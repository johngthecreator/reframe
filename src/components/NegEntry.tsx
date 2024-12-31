import {
	Dialog,
	DialogContent,
	DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NegEntry(props: { open: boolean, setOpen: (open: boolean) => void }) {
	const navigate = useNavigate();
	const reframeLater = () => {
		props.setOpen(false);
		navigate('/');
	}

	return (
		<Dialog open={props.open} onOpenChange={props.setOpen}>
			<DialogContent
				onInteractOutside={(e) => {
					e.preventDefault(); // Prevent closing when clicking outside
				}}
				className="w-11/12 rounded-lg flex bg-offwhite flex-col justify-left">
				<DialogTitle className="text-2xl text-brightblue">Hey...</DialogTitle>
				<p>I noticed that this last journal entry seems a little negative. I hope you're doing ok. Take some time to think about it, process everything, and when you're ready this entry will be in your Waning collection waiting to be rewritten.</p>
				<Button onClick={reframeLater} className="bg-normblue hover:bg-normblue hover:brightness-90 text-white">ok.</Button>
			</DialogContent>
		</Dialog>
	)
}

