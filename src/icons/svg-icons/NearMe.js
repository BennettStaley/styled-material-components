import React from "react";

import { Icon } from "../icons";

const NearMePath = () => [
  <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" key="path0" />
];

const NearMeIcon = Icon.extend.attrs({
  children: NearMePath
})``;

export default NearMePath;
export { NearMeIcon };
