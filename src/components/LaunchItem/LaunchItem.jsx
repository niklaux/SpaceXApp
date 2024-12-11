import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";

const LaunchItem = ({ launch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const timeAgo = launch?.launch_date_utc
    ? formatDistanceToNow(new Date(launch?.launch_date_utc))
    : "";

  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="border mb-3 shadow-sm rounded-2 p-4">
      <h3 className="fw-bold m-0">
        {launch?.mission_name}{" "}
        <span
          className={`align-top badge ${
            launch?.launch_success ? "bg-success" : "bg-danger"
          }`}
          style={{ fontSize: "10px" }}
        >
          {launch?.launch_success ? "Success" : "Failed"}
        </span>
      </h3>

      <div
        className={`launch-details ${isExpanded ? "expanded" : "collapsed"}`}
      >
        <p>
          <span className="text-muted">{timeAgo} ago</span> |{" "}
          {launch?.links?.video_link && (
            <a href={launch?.links?.video_link}>Video</a>
          )}
        </p>

        <div className="row mt-3">
          <div className="col-lg-3 d-flex">
            <img
              src={launch?.links?.mission_patch_small}
              alt=""
              style={{ height: "5rem", width: `auto` }}
              className="mx-auto my-3"
            />
          </div>
          <div className="col-lg-9">
            <p className="p-2">{launch?.details}</p>
          </div>
        </div>
      </div>

      <button className="btn btn-primary my-2 " onClick={toggleDetails}>
        {isExpanded ? "HIDE" : "VIEW"}
      </button>
    </div>
  );
};

export default LaunchItem;
