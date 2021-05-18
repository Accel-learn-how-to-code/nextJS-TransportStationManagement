import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  inputHolder: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  input: {
    flexGrow: 1,
    marginRight: 10,
  },
  button: {
    maxHeight: 40,
  },
}));

export default function SearchInput({ searchUsersName, refesh }) {
  const classes = useStyles();
  const [inputValue, setInputvalue] = useState("");

  useEffect(() => {
    setInputvalue(""); //children function of interest
  }, [refesh]);

  const handleChangeTextField = (event) => {
    //console.log("Input: " + event.target.value);
    setInputvalue(event.target.value);
  };

  const buttonClicked = () => {
    searchUsersName(inputValue);
  };

  console.log("rendeerr input");
  return (
    <div className={classes.inputHolder}>
      <TextField
        className={classes.input}
        label="Tìm kiếm"
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={handleChangeTextField}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        className={classes.button}
        onClick={buttonClicked}
      >
        SEARCH
      </Button>
    </div>
  );
}
