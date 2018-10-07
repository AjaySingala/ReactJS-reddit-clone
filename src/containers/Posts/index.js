import React, { Component } from 'react';

class Posts extends Component {

  handleUpvote = (post, key) => {
    var data = post;
    data.upvote = post.upvote + 1;

    this.props.db.collection("posts").doc(post.id).update({
      title: post.title,
      upvote: post.upvote + 1,
      downvote: post.downvote
    });

    // This works. But refreshes whole page.
    //window.location.reload();

    const updatedPosts = this.props.posts;
    updatedPosts[key] = data;
    this.setState({posts: updatedPosts});

    // this.props.firebase.ref('posts/' + key).set({
    //   title: post.title,
    //   upvote: post.upvote + 1,
    //   downvote: post.downvote
    // });
  }

  handleDownvote = (post, key) => {
    var data = post;
    data.downvote = post.downvote + 1;

    this.props.db.collection("posts").doc(post.id).update({
      title: post.title,
      upvote: post.upvote,
      downvote: post.downvote + 1
    });

    // This works. But refreshes whole page.
    //window.location.reload();

    const updatedPosts = this.props.posts;
    updatedPosts[key] = data;
    this.setState({posts: updatedPosts});

    // this.props.firebase.ref('posts/' + key).set({
    //   title: post.title,
    //   upvote: post.upvote,
    //   downvote: post.downvote + 1
    // });
  }

  render() {
    let posts = this.props.posts;
    let _this = this;

    if (!posts) {
      return false;
    }

    if (this.props.loading) {
      return (
        <div>
          Loading…now...
        </div>
      );
    }

    return (
      <div className="Posts">
        {Object.keys(posts).map(function (key) {
          return (
            <div key={key}>
              <div>Title: {posts[key].title}</div>
              <div>Upvotes: {posts[key].upvote}</div>
              <div>Downvotes: {posts[key].downvote}</div>
              <div>
                <button
                  onClick={_this.handleUpvote.bind(this, posts[key], key)}
                  type="button">Upvote</button>
                <button
                  onClick={_this.handleDownvote.bind(this, posts[key], key)}
                  type="button">Downvote</button>
              </div>
            </div>
          );
        }
        )}

        {/* The following shows list of Titles */}
        {/* {this.props.posts.map((doc) => {
          return (
            <div>
              {doc.id}: {doc.title}
            </div>
          );
        })} */}
      </div>
    );
  }
}

export default Posts;

// import React, { Component } from 'react';

// class Posts extends Component {
//   handleUpvote = (post, key) => {
//     this.props.firebase.ref('posts/' + key).set({
//       title: post.title,
//       upvote: post.upvote + 1,
//       downvote: post.downvote
//     });
//   }

//   handleDownvote = (post, key) => {
//     this.props.firebase.ref('posts/' + key).set({
//       title: post.title,
//       upvote: post.upvote,
//       downvote: post.downvote + 1
//     });
//   }

//   render() {
//     let posts = this.props.posts;
//     let _this = this;

//     if (!posts) {
//       return false;
//     }

//     if (this.props.loading) {
//       return (
//         <div>
//           Loading...
//         </div>
//       );
//     }

//     return (
//       <div className="Posts">
//         { Object.keys(posts).map(function(key) {
//             return (
//               <div key={key}>
//                 <div>Title: { posts[key].title }</div>
//                 <div>Upvotes: { posts[key].upvote }</div>
//                 <div>Downvotes: { posts[key].downvote }</div>
//                 <div>
//                   <button
//                     onClick={ _this.handleUpvote.bind(this, posts[key], key) }
//                     type="button"
//                   >
//                     Upvote
//                   </button>
//                   <button
//                     onClick={ _this.handleDownvote.bind(this, posts[key], key) }
//                     type="button"
//                   >
//                     Downvote
//                   </button>
//                 </div>
//               </div>
//             );
//         })}
//       </div>
//     );
//   }
// }

// export default Posts;
