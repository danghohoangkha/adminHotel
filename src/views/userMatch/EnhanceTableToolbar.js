import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import classNames from "classnames";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  Toolbar,
  Button,
  InputBase,
  Typography
} from "@material-ui/core";
import {
  Search as SearchIcon,
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
  const [values, setValues] = React.useState({
    searchText: "",
  });
  const [isSearchOpen, setSearchOpen] = React.useState(false);

  const handleChange = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    }

    setValues(newValues);
    props.onSetFilter(newValues);
  };


  return (
    <Toolbar
      className={clsx(classes.root)}
    >
      <Hidden only={['xs']}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Quản lí người dùng 
        </Typography>
      </Hidden>

      <Hidden only={['lg', 'md']}>
        <div className={classes.title}></div>
      </Hidden>


      <ClickAwayListener onClickAway={() => {
        if (values.searchText === '')
          setSearchOpen(false);
      }} >
        <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            name="searchText"
            onChange={handleChange}
            value={values.searchText}
          />
        </div>
      </ClickAwayListener>
      <Link to = {'/app/news/crud'} style = {{textDecoration: "none"}}>
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