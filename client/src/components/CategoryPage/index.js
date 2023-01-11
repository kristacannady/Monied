import React from "react";
//import all category components
import PageContent from "../PageContent";
import Education from "../EducationPage";
import Community from "../CommunityPage";
import Health from "../HealthPage";
import Family from "../FamilyPage";
import Religious from "../ReligiousPage";
import Other from "../OtherPage";
import { useLocation } from "react-router-dom";

const routeObj = {
  "/education": "Education",
  "/community-outreach": "Community",
  "/health-care": "Health Care",
  "/family-services": "Family Services",
  "/religious": "Religious",
  "/other": "Other",
};

const CategoryPage = () => {
  const location = useLocation();

  const renderPage = (location) => {
    switch (location.pathname) {
      case "/education":
        return <Education />; //education componenet
      case "/community-outreach":
        return <Community />;
      case "/health-care":
        return <Health />;
      case "/family-services":
        return <Family />;
      case "/religious":
        return <Religious />;
      case "/other":
        return <Other />;

      default:
        return <Education />;
    }
  };

  return (
    <section>
      <h2>{routeObj[location.pathname]}</h2>
      <PageContent>{renderPage(location)}</PageContent>
    </section>
  );
};

export default CategoryPage;
