"use strict";
import mydata from "../data.json" assert { type: "json" };
import "../src/reset.css";
import "../src/index.css";
// import { assert } from "console";
// import { type } from "os";
const data = {
  currentUser: {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
};
let input = "";
const textarea = document.querySelector(".add-comment");
textarea.addEventListener("input", () => {
  input = textarea.value;
});
const comments = data.comments;
const commentsContainer = document.querySelector(".comments-container");
const replyContainer = document.querySelector(".reply-container");
addComment(data.comments);
function addComment(arr) {
  arr.forEach((comment) => {
    const wrapperHtml = ` <div class="wrapper">
<div class="score">
  <img
    src="./images/icon-plus.svg"
    alt="plus"
    class="score score-plus"
  />
  <div class="number">${comment.score}</div>
  <img
    src="./images/icon-minus.svg"
    alt="minus"
    class="score score-minus"
  />
</div>
<div class="control">
  <a href="#" class="reply">
    <img
      src="./images/icon-reply.svg"
      alt="rep"
      class="reply-btn"
    />Reply
  </a>
</div>
<div class="user">
  <img
    src=${comment.user.image.webp}
    alt="user1"
    class='user-img'
  />
  <p class="user-name">${comment.user.username}</p>
  <p>1 month ago</p>
</div>
<p class="text">
  <span>${comment.content}</span
  >
</p>
<div class='comment-replies'></div>
</div>`;
    const replies = document.createElement("div");
    replies.classList.add("replies");
    commentsContainer.insertAdjacentHTML("beforeend", wrapperHtml);
    const wrappers = document.querySelectorAll(".wrapper");
    console.log(wrappers);
    const commentReplies = document.querySelector(".comment-replies");
    // if (comment.replies.length) {
    //   comment.replies.forEach((reply) => {
    //     if (reply.user.username == "juliusomo") {
    //       wrappers[1].insertAdjacentHTML("afterend", myReplyHtml);
    //       console.log(reply.user.username);
    //     }
    //   });
    // }
  });
}
let initialScore = 0;
const replies = document.createElement("div");
replies.classList.add("replies");
const last = commentsContainer.lastChild;
last.append(replies);
const txt = document.querySelectorAll(".text");
const replyBtns = document.querySelectorAll(".reply");
const replyContainerClone = replyContainer.cloneNode(true);
replyContainerClone.classList.add("invisible");
replyContainerClone.classList.add("replyClone");
replyBtns.forEach((replyBtn) => {
  replyBtn.addEventListener("click", () => {
    replyContainerClone.classList.toggle("invisible");
    replyBtn.parentElement.parentElement.insertAdjacentElement(
      "afterend",
      replyContainerClone
    );
  });
});
//writing comment
const sendBtn = document.getElementById("send-comment");
sendBtn.addEventListener("click", () => {
  let replyId = 0;
  const reply = document.createElement("div");
  reply.classList.add(`myReply`);
  reply.innerHTML = `
<div class="score">
  <img
    src="./images/icon-plus.svg"
    alt="plus"
    class="score score-plus"
  />
  <div class="number">${initialScore}</div>
  <img
    src="./images/icon-minus.svg"
    alt="minus"
    class="score score-minus"
  />
</div>
<div class="control">
  <a href="#" class="delete">
    <img
      src="./images/icon-delete.svg"
      alt="delete"
      class="delete-btn"
    />Delete
  </a>
  <a href='#' class='edit'>
  <img 
  src='./images/icon-edit.svg'
  alt="edit"
  class="edit-btn"/>Edit
  </a>
</div>
<div class="user">
  <img
    src=${data.currentUser.image.webp}
    alt="user1"
    class='user-img'
  />
  <p class="user-name">${data.currentUser.username}</p>
  <p>1 month ago</p>
</div>
<p class="text" id="replyText">
  <span class="text-wrapper">${input}</span>
</p>
</div>
`;
  commentsContainer.appendChild(reply);
  textarea.value = "";
  textarea.placeholder = "Add new comment...";
  const deleteComment = reply.querySelector(".delete");

  deleteComment.addEventListener("click", () => {
    commentsContainer.removeChild(reply);
  });
  const edit = reply.querySelector(".edit");
  const textWrapper = document.querySelector(".text-wrapper");
  let editable = false;
  edit.addEventListener("click", () => {
    const replyText = reply.querySelector(".text");
    if (editable == false) {
      editable = true;
      replyText.style.backgroundColor = "hsl(228, 33%, 97%)";
    } else {
      editable = false;
      replyText.style.backgroundColor = "hsl(0, 0%, 100%)";
    }
    replyText.contentEditable = editable;
  });
});
