import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  Toolbar,
  Button,
  Typography
} from "@material-ui/core";
import {
  Add as AddIcon
} from "@material-ui/icons";
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import { Link } from "react-router-dom";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },

  title: {
    flex: '1 1 ',
    marginLeft: theme.spacing(1),
    fontWeight:"bold"
  },
  filter: {
    margin: theme.spacing(2)
  },
  search: {
    position: "relative",
    borderRadius: 25,
    paddingLeft: theme.spacing(2.5),
    width: 36,
    backgroundColor: fade(theme.palette.common.black, 0),
    transition: theme.transitions.create(["background-color", "width"]),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
  },
  searchFocused: {
    backgroundColor: fade(theme.palette.common.black, 0.08),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 300,
    },
  },
  searchIcon: {
    width: 36,
    right: 0,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.transitions.create("right"),
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchIconOpened: {
    right: theme.spacing(1.25),
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    height: 36,
    padding: 0,
    paddingRight: 36 + theme.spacing(1.25),
    width: "100%",
  },
  addButton: {
    margin: theme.spacing(2)
  }
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  

  return (
    <Toolbar
      className={clsx(classes.root)}
    >
      <Hidden only={['xs']}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Danh sach các phòng
        </Typography>
      </Hidden>

      <Hidden only={['lg', 'md']}>
        <div className={classes.title}></div>
      </Hidden>

      <Link to = {'/AddRoom'} style = {{textDecoration: "none"}}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          className={classes.addButton}
        >
          Add
        </Button>
      </Link>

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(EnhancedTableToolbar);