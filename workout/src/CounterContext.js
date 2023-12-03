import { useContext, useState } from "react";
import { BlogContext } from "./BlogProvider";
import { Link } from 'react-router-dom';


// for the durations
function TimerDurationInput({ children, duration, onSetDuration }) {
  return (
    <div>
      <input
        type="text"
        placeholder={children}
        value={duration}
        onChange={(e) => onSetDuration(Number(e.target.value))}
      />
    </div>
  );
}

// we have to save the results from the Editor into the Blog component
const Editor = () => {
  const { selectedPost, savePost, closeEditor } = useContext(BlogContext);
  const [title, setTitle] = useState(selectedPost?.title ?? "");
  const [duration, setDuration] = useState(selectedPost?.duration ?? ""); 
  const [repeat, setNumRepeat] = useState(selectedPost?.repeat ?? ""); 
  const [pause, setPause] = useState(selectedPost?.pause ?? ""); 

  return (
    <div className="panel">
      Name of the workout:
      <input
        placeholder="title"
        className="input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      Duration :
      <TimerDurationInput duration={duration} onSetDuration={setDuration}>
        Duration (in seconds)
      </TimerDurationInput>
      Repetition:
      <TimerDurationInput duration={repeat} onSetDuration={setNumRepeat}>
        Number of timer repeats
      </TimerDurationInput>
      Pause :
      <TimerDurationInput duration={pause} onSetDuration={setPause}>
        pause (in seconds)
      </TimerDurationInput>
      <button
        className="button"
        onClick={() => {
          savePost({
            id: selectedPost?.id,
            title,
            duration,
            repeat,
            pause,
          });
        }}
      >
        Save
      </button>
      <button
        className="button"
        onClick={() => {
          closeEditor();
        }}
      >
        Close
      </button>
    </div>
  );
};


// where the data is saved
const Blog = () => {
  const { posts, openPost, openEditor, deletePost, editorOpen } =
    useContext(BlogContext);

  // display the posts
  return (
    <>
      <div className="displayResult"></div>
      <div class="counter-container">
        <div className="panel">
          <div className="header">
            <div className="text">Workout </div>
            <button className="button-counter" onClick={() => openEditor()}>
              Add a timer
            </button>
          </div>
          {posts.map((p) => (
            <div key={p.id}>
              <div
                style={{
                  backgroundColor: "#f2f2f2",
                  padding: 20,
                  marginBottom: 20,
                }}
              >
                <div style={{ display: "flex" }}>
                  <div className="title-workout" style={{ flex: 1 }}>
                    {p.title}
                  </div>

                  <button
                    onClick={() => openPost({ id: p.id })}
                    className="button-counter"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      deletePost({ id: p.id });
                    }}
                    className="button-counter"
                  >
                    Delete
                  </button>
                </div>

                <div>
                  duration: {p.duration}s / pause: {p.pause}s / n° of times:{" "}
                  {p.repeat + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
        {editorOpen && <Editor />}
      </div>

      <div className="footer-counter">
        <Link to="/tabata">
          <button className="button-nav">Start Workout</button>
        </Link>
      </div>
    </>
  );
};

export default Blog;