import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import useStyles from './style'
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
// import MainFooter from "../components/layout/MainFooter";

export default function DefaultLayout ({ children, noNavbar, noFooter }) {
    const classes = useStyles()
    return(
    <Container fluid>
        <Row>
        {/* <MainSidebar /> */}
        <Col
            className={"main-content p-0 contentLogin "+classes.contentLogin}
            lg={{ size: 10, offset: 2 }}
            md={{ size: 9, offset: 3 }}
            sm="12"
            tag="main"
        >
            {!noNavbar && <MainNavbar />}
            {children}
            {/* {!noFooter && <MainFooter />} */}
        </Col> *
        </Row>
    </Container>
    );
};


DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: true,
  noFooter: true,
};

