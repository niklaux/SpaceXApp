import React, { useState, useEffect, useCallback } from "react";
import Spinner from "../Spinner/Spinner";
import LaunchItem from "../LaunchItem/LaunchItem";

const SpaceXApp = () => {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchLaunches = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spacexdata.com/v3/launches?limit=10&offset=${(page - 1) * 10}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setLaunches((prev) => [...prev, ...data]);
      }
    } catch (err) {
      setError("Failed to fetch launches");
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    fetchLaunches();
  }, [page, fetchLaunches]);

  useEffect(() => {
    const filtered = launches.filter((launch) =>
      launch.mission_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLaunches(filtered);
  }, [launches, searchQuery]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container">
      <h1>SpaceX Launches</h1>
      <input
        type="text"
        placeholder="Search via Mission Name"
        value={searchQuery}
        onChange={handleSearch}
      />

      {filteredLaunches.map((launch, index) => (
        <LaunchItem key={index} launch={launch} />
      ))}

      {loading && <Spinner color="light-blue" />}
      {!loading && !filteredLaunches.length && (
        <div className="no-more">No launches match your search</div>
      )}
      {!hasMore && <div className="no-more">No more launches to display</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default SpaceXApp;
