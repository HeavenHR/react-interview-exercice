import React, { Component } from 'react';
import styles from './FriendListApp.css';
import { connect } from 'react-redux';
import { pick, times } from 'lodash';

import {addFriend, deleteFriend, starFriend} from '../actions/FriendsActions';
import { FriendList, AddFriendInput, Paginator } from '../components';
import { setPage, updateAfterChange } from '../actions/PaginationActions';

class FriendListApp extends Component {

  componentWillMount() {
    this.props.updateAfterChange();
  }

  render() {
    const { friendlist: {friendsById}, pagination: {currentPageNo, pageSize} } = this.props;
    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend,
      setPage: this.props.setPage
    };
    const list = pick(friendsById, times(pageSize, n => n + currentPageNo * pageSize));
    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend}/>
        <FriendList friends={list} actions={actions}/>
        <Paginator setPage={actions.setPage}
                   length={friendsById.length}
                   currentPageNo={currentPageNo}
                   pageSize={pageSize}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {
  addFriend,
  deleteFriend,
  starFriend,
  setPage,
  updateAfterChange
})(FriendListApp)
