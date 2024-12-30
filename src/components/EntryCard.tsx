import { Link } from "react-router-dom";
export default function EntryCard(props: { id: number, title: string, text: string }) {
	return (
		<Link key={props.id} className="block" to={{ pathname: "/read", search: `?e=${props.id}` }} viewTransition>
			<div className="bg-white p-3 text-ellipsis overflow-hidden rounded-xl">
				<h2 className="font-semibold">{props.title}</h2>
				<p className="line-clamp-5">
					{props.text}
				</p>
			</div>
		</Link>
	)
}



