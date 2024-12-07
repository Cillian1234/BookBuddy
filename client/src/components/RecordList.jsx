import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Record = (props) => (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            {props.record.firstName +" "+ props.record.lastName}
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            {props.record.email}
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            {props.record.accessLevel}
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            <div className="flex gap-2">
                <Link
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                    to={`/edit/${props.record._id}`}
                >
                    Edit
                </Link>
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
                    color="red"
                    type="button"
                    onClick={() => {
                        props.deleteRecord(props.record._id);
                    }}
                >
                    Delete
                </button>
            </div>
        </td>
    </tr>
);

export default function RecordList() {
    const [users, setUsers] = useState([]);

    // This method fetches the user records from the database.
    useEffect(() => {
        const loadUsers = async () => {
            const results = await fetch(`http://localhost:8080/record/`)
                .then(res => res.json())
            setUsers(results);
            console.log(results);
        }
        loadUsers()
    }, []);

    // This method will delete a record
    async function deleteRecord(id) {
        await fetch(`server/routes/record/${id}`, {
            method: "DELETE",
        });
        const newUsers = users.filter((el) => el._id !== id);
        setUsers(newUsers);
    }

    // This method will map out the records on the table
    function recordList() {
        return users.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <>
            <h3 className="text-lg font-semibold p-4">Employee Records</h3>
            <div className="border rounded-lg overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&amp;_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                Name
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                Position
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                Level
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody className="[&amp;_tr:last-child]:border-0">
                        {recordList()}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}