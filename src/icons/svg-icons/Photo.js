import React from "react";

import { Icon } from "../icons";

const PhotoPath = () => [
  <path
    d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
    key="path0"
  />
];

const PhotoIcon = Icon.extend.attrs({
  children: PhotoPath
})``;

export default PhotoPath;
export { PhotoIcon };
