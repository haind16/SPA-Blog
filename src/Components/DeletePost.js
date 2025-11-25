import { useNavigate } from "react-router-dom";


export default function DeletePost({ slug }) {
    const navigate = useNavigate()
    const API = "http://localhost:8080"

    const hanldeDelete = async () => {
        try {
            const response = await fetch(`${API}/api/post/${slug}`, {
                method: "delete",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json',
                },
            })
            if(response.ok) {
                alert("Da xoa")
                navigate("/posts")
            } else {
                const err = await response.text();
                console.error(err);
                alert("Xoa that bai!");
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <button onClick={hanldeDelete}>
            Delete
        </button>
    )
}
