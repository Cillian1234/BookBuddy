import Navbar from '../components/Navbar.jsx'
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function DBTestPage() {
    const [form, setForm] = useState({
        fName: "",
        sName: "",
        pass: "",
        email: "",
        level: "",
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if(!id) return;
            setIsNew(false);
            const response = await fetch(
                `http://localhost:8080/record/${params.id.toString()}`
            );
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const record = await response.json();
            if (!record) {
                console.warn(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            setForm(record);
        }
        fetchData();
        return;
    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const person = { ...form };
        try {
            let response;
            if (isNew) {
                // if we are adding a new record we will POST to /record.
                response = await fetch("http://localhost:8080/record/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(person),
                });
            } else {
                // if we are updating a record we will PATCH to /record/:id.
                response = await fetch(`http://localhost:8080/record/${params.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(person),
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('A problem occurred adding or updating a record: ', error);
        } finally {
            setForm({
                fName: "",
                sName: "",
                pass: "",
                email: "",
                level: "",
            });
            navigate("/");
        }
    }

    return (
        <>
            <Navbar />
            <h1>DB test</h1>
            <hr/>

            <h3 className="text-lg font-semibold p-4">Create/Update user Record</h3>
            <form
                onSubmit={onSubmit}
                className="border rounded-lg overflow-hidden p-4"
            >
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-slate-900">
                            user Info
                        </h2>
                    </div>

                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="fName"
                                className="block text-sm font-medium leading-6 text-slate-900"
                            >
                                First name
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="fName"
                                        id="fName"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={form.fName}
                                        onChange={(e) => updateForm({fName: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="sName"
                                className="block text-sm font-medium leading-6 text-slate-900"
                            >
                                Last name
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="sName"
                                        id="sName"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={form.sName}
                                        onChange={(e) => updateForm({sName: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-slate-900"
                            >
                                Password
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={form.pass}
                                        onChange={(e) => updateForm({pass: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-slate-900"
                                >
                                    Email
                                </label>
                                <div className="mt-2">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={form.email}
                                            onChange={(e) => updateForm({email: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div>
                                <fieldset className="mt-4">
                                    <legend className="sr-only">Access level Options</legend>
                                    <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                        <div className="flex items-center">
                                            <input
                                                id="positionChild"
                                                name="positionOptions"
                                                type="radio"
                                                value="Child"
                                                className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                                checked={form.level === "Child"}
                                                onChange={(e) => updateForm({level: e.target.value})}
                                            />
                                            <label
                                                htmlFor="positionChild"
                                                className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                                            >
                                                Child
                                            </label>
                                            <input
                                                id="positionParent"
                                                name="positionOptions"
                                                type="radio"
                                                value="Parent"
                                                className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                                checked={form.level === "Parent"}
                                                onChange={(e) => updateForm({level: e.target.value})}
                                            />
                                            <label
                                                htmlFor="positionParent"
                                                className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                                            >
                                                Parent
                                            </label>
                                            <input
                                                id="positionTeacher"
                                                name="positionOptions"
                                                type="radio"
                                                value="Teacher"
                                                className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                                checked={form.level === "Teacher"}
                                                onChange={(e) => updateForm({level: e.target.value})}
                                            />
                                            <label
                                                htmlFor="positionTeacher"
                                                className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                                            >
                                                Teacher
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <input
                        type="submit"
                        value="Save User"
                        className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
                    />
            </form>
        </>
)
}