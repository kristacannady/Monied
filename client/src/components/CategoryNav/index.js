import React from "react";
import { Link } from "react-router-dom";

function categoryNav() {
  return (
    <header>
      <div>
        <nav className="category-nav">
          <Link to="/education">Education</Link>
          <Link to="/community-outreach">Community Outreach</Link>
          <Link to="/health-care">Health Care</Link>
          <Link to="/religious">Religious</Link>
          <Link to="/family-services">Family Services</Link>
          <Link to="/other">Other</Link>
        </nav>
      </div>
    </header>
  );
}

export default categoryNav;
