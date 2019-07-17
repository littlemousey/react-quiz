import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class RedditCaller extends Component {
  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => {};

export default connect(mapStateToProps)(RedditCaller);
