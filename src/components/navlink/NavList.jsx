import React, { useState } from "react";
import styles from "./NavList.module.css";

const NavList = (props) => {
  // control state of linkList
  const [links, setLinks] = useState(props.linkList);

  const onClickLinkHandler = (e) => {
    const index = e.target.dataset.index;
    // clear active, return to false
    let linkTemp = links.map((link) => {
      link.active = false;
      return link;
    });

    // set active
    linkTemp[index].active = true;
    setLinks((pre) => (pre = linkTemp));
  };
  // create links element with icon
  const listContent = links.map((link, index) => (
    <li
      data-index={index}
      key={index}
      className={link.active ? styles.active : ""}
      onClick={onClickLinkHandler}
    >
      <i className={`fa ${link.icon}`} data-index={index} />
      {link.type}
    </li>
  ));
  return <ul className={styles["linkList"]}>{listContent}</ul>;
};

export default NavList;
