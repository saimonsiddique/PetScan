import HomeNavBar from "../NavBar/HomeNavBar/HomeNavBar";
import PostCard from "../PostCard/PostCard";
import "./NewsFeed.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import LatestQuestion from "../QuestionCard/subcomponent/LatestQuestion";
import BookAppointment from "../Profile/subcomponents/ProfileContent/BookAppointment";
const NewsFeed = () => {
  return (
    <section className="feed-container">
      <div className="feed-nav-bar">
        <HomeNavBar />
      </div>
      <div className="feed-content-container">
        <div className="feed-post">
          <div className="post-card">
            <PostCard />
            <BookAppointment />
          </div>
          <div className="latest-question">
            <LatestQuestion />
          </div>
        </div>
        <div className="feed-questions">
          <QuestionCard />
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;
