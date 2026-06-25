import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import api from "../../api";

const dummyRepositories = [
  { _id: "1", name: "github-clone", description: "A full stack GitHub clone built with React and Node.js" },
  { _id: "2", name: "portfolio-website", description: "Personal portfolio website with animations" },
  { _id: "3", name: "chat-app", description: "Real-time chat application using Socket.io" },
  { _id: "4", name: "weather-app", description: "Weather forecast app using OpenWeather API" },
];

const dummySuggestedRepositories = [
  { _id: "s1", name: "react-starter", description: "Boilerplate for React projects" },
  { _id: "s2", name: "node-api-template", description: "Express REST API starter template" },
  { _id: "s3", name: "tailwind-ui-kit", description: "UI components built with Tailwind CSS" },
];

const dummyEvents = [
  { id: 1, name: "Tech Conference", date: "Dec 15" },
  { id: 2, name: "Developer Meetup", date: "Dec 25" },
  { id: 3, name: "React Summit", date: "Jan 5" },
];

const Dashboard = () => {
  const [repositories, setRepositories] = useState(dummyRepositories);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState(dummySuggestedRepositories);
  const [searchResults, setSearchResults] = useState(dummyRepositories);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await api.get(`/repo/user/${userId}`);
        const data = response.data;
        if (data.repositories) setRepositories(data.repositories);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await api.get("/repo/all");
        const data = response.data;
        if (data.length) setSuggestedRepositories(data);
      } catch (err) {
        console.error("Error while fetching suggested repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <section style={styles.dashboard}>

          {/* Left Sidebar - Suggested Repos */}
          <aside style={styles.sidebar}>
            <h3 style={styles.sidebarTitle}>Suggested Repositories</h3>
            {suggestedRepositories.map((repo) => (
              <div
                key={repo._id}
                style={styles.suggestedCard}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#58a6ff"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#30363d"}
              >
                <span style={styles.repoIcon}>📁</span>
                <div>
                  <h4 style={styles.repoNameBlue}>{repo.name}</h4>
                  <p style={styles.repoDesc}>{repo.description}</p>
                </div>
              </div>
            ))}
          </aside>

          {/* Main Content - Your Repos */}
          <main style={styles.main}>
            <div style={styles.mainHeader}>
              <h2 style={styles.mainTitle}>Your Repositories</h2>
              <button style={styles.newBtn}>+ New</button>
            </div>

            <div style={styles.searchBar}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                value={searchQuery}
                placeholder="Find a repository..."
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.repoList}>
              {searchResults.length === 0 ? (
                <p style={styles.emptyText}>No repositories found</p>
              ) : (
                searchResults.map((repo) => (
                  <div
                    key={repo._id}
                    style={styles.repoCard}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#161b22"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0d1117"}
                  >
                    <div style={styles.repoCardHeader}>
                      <span style={styles.repoIcon}>📦</span>
                      <h4 style={styles.repoNameBlue}>{repo.name}</h4>
                      <span style={styles.repoBadge}>Public</span>
                    </div>
                    <p style={styles.repoDesc}>{repo.description}</p>
                    <div style={styles.repoMeta}>
                      <span style={styles.repoLang}>⬤ JavaScript</span>
                      <span style={styles.repoUpdated}>Updated recently</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>

          {/* Right Sidebar - Events */}
          <aside style={styles.sidebar}>
            <h3 style={styles.sidebarTitle}>Upcoming Events</h3>
            <ul style={styles.eventsList}>
              {dummyEvents.map((event) => (
                <li
                  key={event.id}
                  style={styles.eventItem}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#58a6ff"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#30363d"}
                >
                  <div style={styles.eventDot}></div>
                  <div>
                    <p style={styles.eventName}>{event.name}</p>
                    <span style={styles.eventDate}>{event.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

        </section>
      </div>
    </>
  );
};

const styles = {
  page: {
    backgroundColor: "#0d1117",
    minHeight: "100vh",
    width: "100%",
  },
  dashboard: {
    display: "grid",
    gridTemplateColumns: "260px 1fr 260px",
    gap: "24px",
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "32px 24px",
    boxSizing: "border-box",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sidebarTitle: {
    color: "#e6edf3",
    fontSize: "14px",
    fontWeight: "600",
    paddingBottom: "8px",
    borderBottom: "1px solid #21262d",
    marginBottom: "4px",
    marginTop: 0,
  },
  suggestedCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "8px",
    padding: "12px",
    cursor: "pointer",
    transition: "border-color 0.2s ease",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  mainHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainTitle: {
    color: "#e6edf3",
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
  },
  newBtn: {
    backgroundColor: "#238636",
    color: "#ffffff",
    border: "1px solid #2ea043",
    borderRadius: "6px",
    padding: "6px 14px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: "6px",
    padding: "8px 12px",
  },
  searchIcon: {
    fontSize: "14px",
    opacity: 0.5,
  },
  searchInput: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#e6edf3",
    fontSize: "14px",
    width: "100%",
  },
  repoList: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #21262d",
    borderRadius: "8px",
    overflow: "hidden",
  },
  repoCard: {
    backgroundColor: "#0d1117",
    padding: "16px",
    borderBottom: "1px solid #21262d",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  repoCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "6px",
  },
  repoIcon: {
    fontSize: "16px",
  },
  repoNameBlue: {
    color: "#58a6ff",
    fontSize: "15px",
    fontWeight: "600",
    margin: 0,
  },
  repoBadge: {
    fontSize: "11px",
    color: "#8b949e",
    border: "1px solid #30363d",
    borderRadius: "20px",
    padding: "1px 8px",
    marginLeft: "auto",
  },
  repoDesc: {
    color: "#8b949e",
    fontSize: "13px",
    margin: "0 0 8px 0",
    lineHeight: "1.5",
  },
  repoMeta: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  repoLang: {
    color: "#8b949e",
    fontSize: "12px",
  },
  repoUpdated: {
    color: "#6e7681",
    fontSize: "12px",
  },
  eventsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  eventItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "10px 12px",
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "border-color 0.2s ease",
    listStyle: "none",
  },
  eventDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#238636",
    marginTop: "5px",
    flexShrink: 0,
  },
  eventName: {
    color: "#e6edf3",
    fontSize: "13px",
    fontWeight: "500",
    margin: "0 0 2px 0",
  },
  eventDate: {
    color: "#8b949e",
    fontSize: "12px",
  },
  emptyText: {
    color: "#6e7681",
    fontSize: "13px",
    textAlign: "center",
    padding: "20px 0",
    margin: 0,
  },
};

export default Dashboard;
