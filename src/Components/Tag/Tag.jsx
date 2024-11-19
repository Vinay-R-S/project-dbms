import PropTypes from "prop-types";
import "./Tag.css"; // Adjusted the path for CSS

function Tag({ name, tag_type }) {
  return <span className={tag_type}>{name}</span>;
}

Tag.propTypes = {
  name: PropTypes.string,
  tag_type: PropTypes.string, // Added validation for tag_type
};

Tag.defaultProps = {
  name: "User",
  tag_type: "default-tag", // Optional default class in case no tag_type is provided
};

export default Tag;


// import PropTypes from "prop-types";
// import "../Tag/Tag.css";


// function Tag(props){
//     return(
//         <span className={props.tag_type}>{props.name}</span>
//     );
// }

// Tag.propTypes = {
//     name: PropTypes.string
// }

// Tag.defaultProps = {
//     name: "User"
// }

// export default Tag;
