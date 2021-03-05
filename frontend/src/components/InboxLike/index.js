import React from "react";
import { List, message, Image } from "antd";
import { getRequest } from "../../requests/requestLikes";
import ReactMarkdown from "react-markdown";
import PostDisplay from "../PostDisplay";
import { getAuthorUseID } from "../../requests/requestAuthor";

export default class InboxRequest extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      requestDataSet: [],
      authorID : this.props.authorID,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    console.log("stream1", this.state.authorID);
    getRequest({
      authorID: this.state.authorID,
    }).then((res) => {
      if (res.status === 200) {
        const myRequests = this.getRequestDataSet(res.data);
        this.setState({ requestDataSet: myRequests });
      } else {
        message.error("Fail to get my requests.");
      }
    });

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getRequestDataSet = (requestData) => {
    var requestSet = [];
    requestData.forEach((element) => {
      const myRequest = {
        actor: element.actor,
      };
      // TODO: can't show author name
      getAuthorUseID({ authorID: element.actor }).then((res) => {
        myRequest.actor = res.data.displayName;
        console.log("test6", myRequest.actor);
      });
      console.log("test5", myRequest);
      requestSet.push(myRequest);
    });
    return requestSet;
  };

  render() {
    const { requestDataSet } = this.state;
    console.log("inboxlikes", this.props.authorID);
    return (
      <div style={{}}>
        <List
          className="requests"
          itemLayout="horizontal"
          dataSource={requestDataSet}
          renderItem={(item) => (
            <li>
              {item.actor}
              <p>starts to follow you</p>
            </li>
          )}
        />
      </div>
    );
  }
}
