import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePost() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const API = "http://localhost:8080";

    const [form, setForm] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`${API}/api/post/${slug}`);
                const data = await res.json();
                setForm(data);
            } catch (err) {
                console.error(err);
            } 
        };
        fetchPost();
    }, []);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${API}/api/post/${slug}`, {
                method: "PATCH", 
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            if (response.ok) {
                alert("Cap nhat thanh cong");
                navigate(`/posts`);
            } else {
                const err = await response.text();
                console.error(err);
                alert("Cap nhat that bai");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={{ padding: 10 }}><br />
            <span>Slug:</span>
            <input type="text" value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} /><br />

            <span>Title:</span>
            <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} /><br />

            <span>Description:</span>
            <input type="text" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} /><br />

            <button onClick={handleUpdate}>Cap nhat</button>
        </div>
    );
}
