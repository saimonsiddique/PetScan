import React from "react";
import HomeNavBar from "../NavBar/HomeNavBar/HomeNavBar";
import PostCard from "../PostCard/PostCard";
import "./NewsFeed.css";
import QuestionCard from "../QuestionCard/QuestionCard";

const NewsFeed = () => {
  return (
    <section className="feed-container">
      <div className="feed-nav-bar">
        <HomeNavBar />
      </div>
      <div className="feed-content-container">
        <div className="feed-post">
          <PostCard />
          {/* <QuestionCard /> */}
        </div>
        <div className="feed-articles">
          <h2>Feed Article</h2>
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;
