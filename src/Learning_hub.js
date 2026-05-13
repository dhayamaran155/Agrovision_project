import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

function LearningHub() {
  const { language, toggleLanguage, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Base courses data
  const baseCourses = [
    {
      id: 1,
      image: "/learning_hub image/Organic Farming Basics.jpeg",
      category: "Organic",
      progress: 40,
    },
    {
      id: 2,
      image: "/learning_hub image/Pest Management in Crops.jpeg",
      category: "Pest",
      progress: 20,
    },
    {
      id: 3,
      image: "/learning_hub image/Irrigation Techniques.jpeg",
      category: "Irrigation",
      progress: 75,
    },
    {
      id: 4,
      image: "/learning_hub image/Crop Rotation Strategies.jpeg",
      category: "Soil",
      progress: 55,
    },
    {
      id: 5,
      image: "/learning_hub image/Soil Fertility & Nutrients.jpeg",
      category: "Soil",
      progress: 90,
    },
    {
      id: 6,
      image: "/learning_hub image/Greenhouse Farming.jpeg",
      category: "Organic",
      progress: 60,
    },
    {
      id: 7,
      image: "/learning_hub image/Composting & Vermiculture.jpeg",
      category: "Soil",
      progress: 30,
    },
    {
      id: 8,
      image: "/learning_hub image/Beekeeping & Honey Production.jpeg",
      category: "Livestock",
      progress: 55,
    },
    {
      id: 9,
      image: "/learning_hub image/Dairy & Livestock Management.jpeg",
      category: "Livestock",
      progress: 25,
    },
    {
      id: 10,
      image: "/learning_hub image/Hydroponics & Soilless Farming.jpeg",
      category: "Technology",
      progress: 65,
    },
    {
      id: 11,
      image: "/learning_hub image/Agroforestry Systems.jpeg",
      category: "Organic",
      progress: 35,
    },
    {
      id: 12,
      image: "/learning_hub image/Climate-Smart Agriculture.jpeg",
      category: "Organic",
      progress: 80,
    },
    {
      id: 13,
      image: "/learning_hub image/Post-Harvest Management.jpeg",
      category: "Storage",
      progress: 70,
    },
    {
      id: 14,
      image: "/learning_hub image/Aquaculture & Fisheries.jpeg",
      category: "Livestock",
      progress: 45,
    },
    {
      id: 15,
      image: "/learning_hub image/Precision Agriculture.jpeg",
      category: "Technology",
      progress: 50,
    },
  ];

  // Translated courses
  const courses = baseCourses.map((course, index) => ({
    ...course,
    title: t.learningHub.courses[index].title,
    description: t.learningHub.courses[index].description,
  }));

  // ✅ Filtering Logic
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || course.category === category)
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t.learningHub.title}</h1>

      {/* Search + Category Filter */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder={t.learningHub.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchBar}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.dropdown}
        >
          <option value="All">{t.learningHub.allCategories}</option>
          {Object.entries(t.learningHub.categories).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>

        <button onClick={toggleLanguage} style={styles.langBtn}>
          {language === "en" ? "தமிழ்" : "English"}
        </button>
      </div>

      {/* Courses Section */}
      <div style={styles.coursesGrid}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} style={styles.card}>
              <img src={course.image} alt={course.title} style={styles.image} />
              <h3 style={styles.cardTitle}>{course.title}</h3>
              <p style={styles.cardDesc}>{course.description}</p>

              {/* Progress Bar
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${course.progress}%`,
                  }}
                ></div>
              </div>
              <p style={styles.progressText}>
                {course.progress}
                {t.learningHub.completed}
              </p> */}

             
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  course.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.linkButton}
              >
                {t.learningHub.learnMore}
              </a>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                  course.title.split(" / ")[0]
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.youtubeButton}
              >
                {t.learningHub.watchVideo}
                Watch on YouTube
              </a>
            </div>
          ))
        ) : (
          <p style={styles.noResults}>{t.learningHub.noResults}</p>
        )}
      </div>
    </div>
  );
}

// Styles (same as before)
const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    backgroundImage: "url('/background4.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#fff",
    textShadow: "2px 2px 5px #000",
    fontSize: "2.2rem",
    fontWeight: "bold",
  },
  filters: {
    textAlign: "center",
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  searchBar: {
    padding: "10px",
    width: "280px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  dropdown: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    cursor: "pointer",
  },
  langBtn: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  coursesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "25px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "18px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    backgroundColor: "rgba(255,255,255,0.95)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardTitle: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#333",
    fontWeight: "bold",
  },
  cardDesc: {
    fontSize: "14px",
    color: "#555",
    margin: "10px 0",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  button: {
    marginTop: "12px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  linkButton: {
    display: "inline-block",
    marginTop: "12px",
    marginLeft: "10px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  youtubeButton: {
    display: "inline-block",
    marginTop: "12px",
    marginLeft: "10px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ff0000",
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  progressBar: {
    marginTop: "12px",
    width: "100%",
    height: "8px",
    backgroundColor: "#eee",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#28a745",
    borderRadius: "5px",
    transition: "width 0.5s ease",
  },
  progressText: {
    fontSize: "12px",
    color: "#555",
    marginTop: "5px",
  },
  noResults: {
    gridColumn: "1 / -1",
    textAlign: "center",
    fontSize: "18px",
    color: "#fff",
    textShadow: "1px 1px 3px #000",
  },
};

export default LearningHub;
