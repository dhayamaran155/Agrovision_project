import React, { useState } from "react";

function LearningHub() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // ✅ Expanded Agriculture Learning Courses (15 total)
  const courses = [
    {
      id: 1,
      title: "Organic Farming Basics",
      description: "Learn the fundamentals of organic farming and soil health.",
      image: "/learning_hub image/Organic Farming Basics.jpeg",
      category: "Organic",
      progress: 40,
    },
    {
      id: 2,
      title: "Pest Management in Crops",
      description: "Effective strategies to manage pests without chemicals.",
      image: "/learning_hub image/Pest Management in Crops.jpeg",
      category: "Pest",
      progress: 20,
    },
    {
      id: 3,
      title: "Irrigation Techniques",
      description: "Modern irrigation techniques to save water and improve yield.",
      image: "/learning_hub image/Irrigation Techniques.jpeg",
      category: "Irrigation",
      progress: 75,
    },
    {
      id: 4,
      title: "Crop Rotation Strategies",
      description: "Increase soil fertility and reduce diseases with crop rotation.",
      image: "/learning_hub image/Crop Rotation Strategies.jpeg",
      category: "Soil",
      progress: 55,
    },
    {
      id: 5,
      title: "Soil Fertility & Nutrients",
      description: "Understand soil nutrients and fertilizers for better crops.",
      image: "/learning_hub image/Soil Fertility & Nutrients.jpeg",
      category: "Soil",
      progress: 90,
    },
    {
      id: 6,
      title: "Greenhouse Farming & Conservatory",
      description: "Master controlled-environment farming for year-round yield.",
      image: "/learning_hub image/Greenhouse Farming.jpeg",
      category: "Organic",
      progress: 60,
    },
    {
      id: 7,
      title: "Composting & Vermiculture",
      description: "Convert waste into organic manure through composting methods.",
      image: "/learning_hub image/Composting & Vermiculture.jpeg",
      category: "Soil",
      progress: 30,
    },
     {
      id: 8,
      title: "Beekeeping & Honey Production",
      description: "Basics of apiculture for honey and pollination benefits.",
      image: "/learning_hub image/Beekeeping & Honey Production.jpeg",
      category: "Livestock",
      progress: 55,
    },
     {
      id: 9,
      title: "Dairy & Livestock Management",
      description: "Best practices for livestock care and dairy production.",
      image: "/learning_hub image/Dairy & Livestock Management.jpeg",
      category: "Livestock",
      progress: 25,
    },
    {
      id: 10,
      title: "Hydroponics & Soilless Farming",
      description: "Grow crops without soil using water and nutrients.",
      image: "/learning_hub image/Hydroponics & Soilless Farming.jpeg",
      category: "Technology",
      progress: 65,
    },
    {
      id: 11,
      title: "Agroforestry Systems",
      description: "Integrate trees and crops for sustainable land use.",
      image: "/learning_hub image/Agroforestry Systems.jpeg",
      category: "Organic",
      progress: 35,
    },
    {
      id: 12,
      title: "Climate-Smart Agriculture",
      description: "Adapt farming methods to climate change challenges.",
      image: "/learning_hub image/Climate-Smart Agriculture.jpeg",
      category: "Organic",
      progress: 80,
    },
    {
      id: 13,
      title: "Post-Harvest Management",
      description: "Reduce losses and improve crop storage techniques.",
      image: "/learning_hub image/Post-Harvest Management.jpeg",
      category: "Storage",
      progress: 70,
    },
    {
      id: 14,
      title: "Aquaculture & Fisheries",
      description: "Learn sustainable methods of fish and prawn farming.",
      image: "/learning_hub image/Aquaculture & Fisheries.jpeg",
      category: "Livestock",
      progress: 45,
    },
    {
      id: 15,
      title: "Precision Agriculture",
      description: "Use technology like drones & IoT for smarter farming.",
      image: "/learning_hub image/Precision Agriculture.jpeg",
      category: "Technology",
      progress: 50,
    },
  ];

  // ✅ Filtering Logic
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || course.category === category)
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌱 AgroVision Learning Hub</h1>

      {/* Search + Category Filter */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="🔍 Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchBar}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.dropdown}
        >
          <option value="All">All Categories</option>
          <option value="Organic">Organic</option>
          <option value="Pest">Pest</option>
          <option value="Irrigation">Irrigation</option>
          <option value="Soil">Soil</option>
          <option value="Technology">Technology</option>
          <option value="Livestock">Livestock</option>
          <option value="Storage">Storage</option>
        </select>
      </div>

      {/* Courses Section */}
      <div style={styles.coursesGrid}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} style={styles.card}>
              <img src={course.image} alt={course.title} style={styles.image} />
              <h3 style={styles.cardTitle}>{course.title}</h3>
              <p style={styles.cardDesc}>{course.description}</p>

              {/* Progress Bar */}
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${course.progress}%`,
                  }}
                ></div>
              </div>
              <p style={styles.progressText}>{course.progress}% Completed</p>

              <button style={styles.button}>📖 Start Learning</button>
            </div>
          ))
        ) : (
          <p style={styles.noResults}>❌ No courses found</p>
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
