import React from "react";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";
import { transformImage } from "../../lib/featues";

const RenderAttachments = ({ file, url }) => {

switch (file) {
  case "video":
  case "mp4":
  case "webm":
    return <video src={url} preload="none" width="200px" controls />;

  case "audio":
  case "mp3":
    return <audio src={url} preload="none" controls />;

  case "image":
  case "jpg":
  case "jpeg":
  case "png":
    return (
      <img
        src={transformImage(url, 200)}
        alt="attachments"
        width="200px"
        height="150px"
        style={{ objectFit: "contain" }}
      />
    );

  default:
    return <FileOpenIcon />;
}
};

export default RenderAttachments;
