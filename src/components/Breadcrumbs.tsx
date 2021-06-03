import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
//import Link from "next/link";

export default function SimpleBreadcrumbs({ breadcumbData }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcumbData.map((item, index) =>
        index !== breadcumbData.length - 1 ? (
          <Link color="inherit" href={item.path} key={index}>
            {item.pathName}
          </Link>
        ) : (
          <Typography color="textPrimary" key={index}>
            {item.pathName}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
}
