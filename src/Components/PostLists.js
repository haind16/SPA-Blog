import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PostLists() {
  const [posts, setPosts] = useState([]);
  const API = "http://localhost:8080";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/api/posts`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setPosts(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link to={`/posts/${post.slug}`}>
            <h3>{post.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
