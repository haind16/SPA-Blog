import { useState } from "react";
import "./styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Login from "./Components/Login";
import Post from "./Components/Post";
import Posts from "./Components/Posts";
import PostLists from "./Components/PostLists";
import NoMatch from "./Components/NoMatch";
import Home from "./Components/Home";
import About from "./Components/About";
import NewPost from "./Components/NewPost";
import Stats from "./Components/Starts";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  const [user, setUser] = useState(false);

  console.log(user)
  return (
    <Router>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/posts" style={{ padding: 5 }}>
          Posts
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
          About
        </Link>
        {user &&
          <Link to="/newpost" style={{ padding: 5 }}>
            New Post
          </Link>
        }
        {user && 
          <Link to="/stats" style={{padding: 5}}> 
            Stats 
          </Link>
        }
        {!user && 
          <Link to="/login" style={{padding: 5}}> 
            Login 
          </Link>
        }
        {user && <span onClick={() => setUser(false)} style={{padding: 5, cursor: 'pointer'}}> Logout </span>}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />}>
          <Route index element={<PostLists />} />
          <Route path=":slug" element={<Post />}>
            <Route path="update" element={<UpdatePost />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login onLogin={setUser}/>}/>
        <Route path="/stats" element={<ProtectedRoute user={user}><Stats/></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/newpost" element={<ProtectedRoute user={user}><NewPost/></ProtectedRoute>}/>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}
