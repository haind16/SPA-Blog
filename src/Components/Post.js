import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DeletePost from "./DeletePost";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState("");
  const API = "http://localhost:8080";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/api/post/` + slug);
        const result = await response.json();
        setPost(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = () => {
    navigate(`update`)
  }
  
  const { title, description } = post;

  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={handleUpdate}>Cap Nhat</button>
      <DeletePost slug={slug} />
      <Outlet />
    </div>);
}