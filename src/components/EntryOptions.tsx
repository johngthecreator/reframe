import { Ellipsis } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom";

import { db } from "@/lib/db"

export function EntryOptions(props: { id: number }) {
	const navigate = useNavigate();
	const deleteEntry = async () => {
		db.entries.delete(props.id)
			.then(() => navigate("/"))
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="text-black"><Ellipsis /></button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Entry Options</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem onClick={deleteEntry}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
