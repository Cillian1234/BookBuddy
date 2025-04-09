import {redirect} from "react-router-dom";

export default async function Login(username, pass, level) {

    // TODO: I thought I was onto something man :(

    await fetch(`http://localhost:8080/record/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Indicate the type of data being sent
        },
        body: JSON.stringify({
            username, pass, level
        }),
    })
        .then(res => res.json())
        .then(data => {
            if (data) {
                return redirect('/teacher');
            }
        })


        // .then(data => {
        //     if (data) {
        //         switch (level) {
        //             case "Teacher": return redirect('/teacher');
        //             case "Parent": return '/parent';
        //             case "Child": return '/child';
        //             default: return null;
        //         }
        //     }
        // })
}