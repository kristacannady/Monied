import React from "react";
import { Link } from "react-router-dom";

function categoryNav() {
  return (
    <header>
      <div>
        <nav className="category-nav">
          <Link className="outline" to="/education">
            Education
          </Link>
          <Link className="outline" to="/community-outreach">
            Community Outreach
          </Link>
          <Link className="outline" to="/health-care">
            Health Care
          </Link>
          <Link className="outline" to="/religious">
            Religious
          </Link>
          <Link className="outline" to="/family-services">
            Family Services
          </Link>
          <Link className="outline" to="/other">
            Other
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default categoryNav;
