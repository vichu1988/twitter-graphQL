import React from 'react';
import Relay from 'react-relay';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import './app.css';


class App extends React.Component {

  trimDate(fullDate) {
    const dateLength = fullDate.length;
    let dateStamp = fullDate.slice(3, 10) + " " + fullDate.slice(dateLength - 4, dateLength)
    return dateStamp;
  }

  render() {
    return (<div>
      <h1>Twitteratis</h1>
      {this.props.tweet.tweet.map(tweet =>
        //  <span key={tweet.id}><small>id: {tweet.id}</small> <br></br> {tweet.text}  <br></br>-- @<i>{tweet.user.screen_name}</i></span>

        <Card key={tweet.id}
              style={{
                margin: '15px 3px'
              }}
        >
          <CardText
            style={{
              fontSize: '22px'
            }}>
            {tweet.text}+ {tweet.user.profile_image_url}
          </CardText>
          <CardHeader
            title={tweet.user.screen_name}
            avatar={tweet.user.profile_image_url}
            subtitle={this.trimDate(tweet.created_at)}
            style={{
              textAlign: 'right'
            }}
          />
        </Card>
      )}
    </div>);
  }
}

export default Relay.createContainer(App, {
  fragments: {
    tweet: () => Relay.QL`
        fragment on Viewer {
            tweet{
                id,
                text,
                created_at
                user{
                    screen_name,
                    profile_image_url
                }
            }
        }
    `,
  },
});
