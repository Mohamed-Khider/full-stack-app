"use client";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import signout from "@/firebase/auth/signout";
import addData from "@/firebase/firestore/addData";
import { fetchData } from "@/firebase/firestore/getData"; // Fixed import path

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [data, setData] = useState({ date: Date.now(), name: "", address: "" });
  const [posts, setPosts] = useState([]); // Store fetched posts

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    } else {
      fetchPosts(); // Fetch posts when user is authenticated
    }
  }, [user, router]);

  const fetchPosts = async () => {
    const { data, error } = await fetchData(); // Fetch posts from Firestore
    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data); // Update state with fetched data
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    const { error } = await signout();
    if (error) {
      alert(error);
      console.error(error);
      return;
    }
    router.push("/signin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addData("posts", user.uid + Date.now(), data);
    if (!result.error) {
      alert("New post added successfully!");
      fetchPosts(); // Refresh posts after adding a new one
    } else {
      alert("Error adding post");
    }
  };

  function Card({ title, value }) {
    return (
      <div className="w-50 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-500">{value}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen ">
      {/* Top Bar */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            <p className="font-bold text-4xl">Hello</p>
            {user ? user.email : ""}
          </span>
          <button
            className="cursor-pointer text-3xl p-3 rounded-3xl items-center justify-center flex bg-amber-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Form Section */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Add users</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Address"
            onChange={(e) => setData({ ...data, address: e.target.value })}
            required
          />
          <button className="bg-blue-500 text-white p-2 rounded" type="submit">
            Add Data
          </button>
        </form>
      </div>

      {/* Display Fetched Posts */}
      <div className="p-3">
        <h2 className="text-2xl font-bold mb-4">All Posts</h2>
        <div className="grid grid-cols-5 gap-6 items-center self-center">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} title={post.name} value={post.address} />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
