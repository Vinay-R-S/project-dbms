import React from "react";
import "./ProjectCard.css";
import Tag from "../Tag/Tag";

const ProjectCard = () => {
  return (
    <div className="card-container">
      <div className="card-header">
        <h3 className="project-title">Project DBMS</h3>
        <Tag name="28th Oct, 2024" tag_type="date-tag" />
      </div>
      <div className="card-owner">
        <Tag name="Ashwini" tag_type="owner-tag" />
      </div>
      <div className="card-description">
        <p>
          Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation...
        </p>
      </div>
      <div className="card-footer">
        <div className="footer-tags">
          <Tag name="Krishna" tag_type="team-tag" />
          <Tag name="Vinay" tag_type="team-tag" />
        </div>
        <div className="add-btn">+</div>
      </div>
    </div>
  );
};

export default ProjectCard;


// import React from "react";
// import "../ProjectCard/ProjectCard.css";
// import "../Tag/Tag.jsx"

// const ProjectCard = () => {
//   return (
//     <div className="card-container">
//       <div className="card-header">
//         <h3 className="project-title">Project DBMS</h3>
//         {/* <span className="date-tag">28th Oct, 2024</span> */}
//         <Tag name="28th Oct, 2024" tag_type="date-tag"/>
//       </div>
//       <div className="card-owner">
//         {/* <span className="owner-tag">Ashwini</span> */}
//         <Tag name="Ashwini" tag_type="owner-tag"/>
//       </div>
//       <div className="card-description">
//         <p>
//           Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
//           sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//           enim ad minim veniam, quis nostrud exercitation...
//         </p>
//       </div>
//       <div className="card-footer">
//         <div className="footer-tags">
//           {/* <span className="team-tag">Krishna</span>
//           <span className="team-tag">Vinay</span> */}
//             <Tag name="Krishna" tag_type="team-tag"/>
//             <Tag name="Vinay" tag_type="team-tag"/>
//         </div>
//         <div className="add-btn">+</div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;
