import React, { useEffect, useState, useRef } from "react";
import "./Community.css";

function Community() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🌐 Language
  const [lang, setLang] = useState("en");

  // 🎤 Voice
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // 🌐 Language texts
  const text = {
    en: {
      header: "AgroVision Community",
      title: "Ask something to the community...",
      desc: "Explain your crop issue or idea...",
      send: "Send",
      record: "🎤 Record",
      stop: "⏹ Stop",
    },
    ta: {
      header: "ஆக்ரோவிஷன் சமூக வலைதளம்",
      title: "உங்கள் கேள்வியை பதிவு செய்யுங்கள்...",
      desc: "உங்கள் பயிர் பிரச்சினையை விளக்குங்கள்...",
      send: "அனுப்பு",
      record: "🎤 பதிவு",
      stop: "⏹ நிறுத்து",
    },
  };

  // 📥 Load discussions
  const loadPosts = () => {
    fetch("http://127.0.0.1:8000/api/forum/discussions/")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // 📝 Create post
  const createPost = async () => {
    if (!title && !description && !audioURL) return;

    await fetch("http://127.0.0.1:8000/api/forum/discussions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    setAudioURL(null);
    loadPosts();
  };

  // 🎤 Start recording (SAFE)
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(blob));
      };

      recorder.start();
      setRecording(true);
    } catch (error) {
      alert("🎤 Please allow microphone permission");
      console.error(error);
    }
  };

  // ⏹ Stop recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="community-container">
      {/* Header */}
      <div className="community-header">
        {text[lang].header}
        <button
          className="lang-btn"
          onClick={() => setLang(lang === "en" ? "ta" : "en")}
        >
          🌐 {lang === "en" ? "தமிழ்" : "English"}
        </button>
      </div>

      {/* New Post */}
      <div className="new-post-box">
        <input
          placeholder={text[lang].title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder={text[lang].desc}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* 🎤 Voice */}
        <div className="voice-box">
          {!recording ? (
            <button onClick={startRecording}>{text[lang].record}</button>
          ) : (
            <button onClick={stopRecording}>{text[lang].stop}</button>
          )}

          {audioURL && <audio controls src={audioURL}></audio>}
        </div>

        <button className="send-btn" onClick={createPost}>
          {text[lang].send}
        </button>
      </div>

      {/* Posts */}
      <div className="posts-area">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-user">{post.user}</div>
            <div className="post-title">{post.title}</div>
            <div className="post-desc">{post.description}</div>

            <div className="replies">
              {post.replies.map((r) => (
                <div key={r.id} className="reply-bubble">
                  <span>{r.user}</span>
                  <p>{r.message}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
