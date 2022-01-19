const feedImages = document.querySelectorAll(".imagelist_feed");
const feedCard = document.querySelector(".card_wrap");
const article = document.querySelector('.card_feed');
const feedSection = document.querySelector(".feed_section");
const moreImageBtn = document.querySelectorAll(".more_image");
const modal = document.querySelector(".modal");
const modalProfile = document.querySelector(".modal_profile");
const closeBtn = modal.querySelector(".close-area");
const logoutProfile = document.querySelector(".logout_profile");
const modalContent = document.querySelector(".content");
const token = localStorage.getItem("Token");



// 팔로잉 리스트 가져오기
async function getFollowing() {
  const url = "http://146.56.183.55:5050";
  const accountName = localStorage.getItem("Accountname");
  const res = await fetch(url + `/profile/${accountName}/following?limit=Number&skip=Number`, {
    method: "GET",
    headers:
    {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  });

  const json = await res.json();
  getNumber(json.length);
  //console.log(json);
  // rkarbfskfk (팔로잉 0명);
  // hey_binky (팔로잉 n명);
};

getFollowing();


// 피드 불러오기
async function getFeed() {
  const url = "http://146.56.183.55:5050"
  const token = localStorage.getItem("Token")
  const res = await fetch(url + "/post/feed/?limit=Number&skip=Number", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json();
  const posts = json.posts;

  //console.log(json);
  imgLoad(posts);
  getDataPost(posts);
  heartedCheck(posts);
  heartChange(json);

  const article = document.querySelectorAll('article');
  const headerHeight = document.querySelector('.home_header').getBoundingClientRect().height;
  const pageHeight = article[article.length - 1].getBoundingClientRect().bottom + headerHeight;
  console.log(article[article.length - 1].getBoundingClientRect());
  const postOption = document.querySelectorAll(".btn_postOption");
  const section = document.querySelector('.feed_section');
  for (let i = 0; i < postOption.length; i++) {
    postOption.item(i).addEventListener("click", () => {
      modalProfile.style.display = "block";
      modalProfile.style.height = `${pageHeight}px`;
      section.classList.add("modal_active");
      //removeModal(section.classList);
    });
  }

  modalProfile.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.classList.contains("modal-overlay")) {
      modalProfile.style.display = "none";
      section.classList.remove("modal_active");
    }
  });
}

function imgLoad(posts) {
  console.log(posts);
  posts.forEach((post, index) => {
    const authorImage = post.author.image
    const authorAccount = post.author.accountname
    const authorName = post.author.username
    const image = post.image
    const commentCount = post.commentCount
    const content = post.content
    const heartCount = post.heartCount
    const hearted = post.hearted
    const postId = post.id
    const postCreatedAt = post.createdAt
    const substring = postCreatedAt.substring(0, 10)
    const dateArr = substring.split('-')
    const postDate = `${dateArr[0]}년 ${dateArr[1]}월 ${dateArr[2]}일`

    if (image === undefined) {
      return;
    }
    const imgArray = image.split(',');
    const img = imgArray[0];

    let imgTag;

    if (image === '') {
      imgTag = '';
    } else {
      imgTag = `<img src= "${img}" alt="" class="image_feed" />`;
    }

    document.querySelector(".feed_section").innerHTML += `
    <article class="card_feed">
    <h4 class="sr-only">피드</h4>
    <img class="profile_feed" src="${authorImage}" alt="${authorAccount}님의 프로필 사진" />
    <div data-id="${postId}" class="content_feed">
    <div class="content_nav">
    <strong>${authorName}</strong>
    <button type="button" class="btn_postOption">
    <img src="../images/icon/s-icon-more-vertical.png" alt="게시물 옵션" class="edit_feed" />
    </button>
    </div>
    <span class="data_account">@${authorAccount}</span>
    <p class="postText">
    ${content}
    </p>
    <div class="imagelist_feed">
    ${imgTag}
    </div>
    <div class="icon_feed">
    <img src="../images/icon/icon-heart.png" alt="" class="like_feed"/>
    <span class="likecount_feed">${heartCount}</span>
    <img src="../images/icon/icon-message-circle.png" alt="" class="img_comment"/>
    <span class="messagecount_feed">${commentCount}</span>
    </div>
    <span class="date_feed">${postDate}</span>
    </div>
    </article>
    `
  });
}

// 팔로워 수를 가져와서 0이면 초기화면, 피드를 보여주기
function getNumber(num) {
  if (num > 0) {
    getFeed();
  } else {
    getFistPage();
  }
};

// 초기 화면 보여주는 함수
function getFistPage() {
  const main = document.querySelector('.main_start');
  const article = document.createElement('article');
  article.setAttribute('class', 'article_guide');
  const img = document.createElement('img');
  img.setAttribute('class', 'img_logo');
  img.setAttribute('src', '../images/symbol-logo-gray.png');
  const p = document.createElement('p');
  p.innerText = '유저를 검색해 팔로우 해보세요!';
  const a = document.createElement('a');
  a.setAttribute('class', 'link_searchMain');
  a.setAttribute('href', './search.html');
  a.innerHTML = '<span>검색하기</span>';
  article.appendChild(img);
  article.appendChild(p);
  article.appendChild(a);
  main.prepend(article);
}

// 클릭하면 해당 포스트로 이동

// 글 클릭하면 해당 포스트로 이동
function getDataPost(posts) {
  const postText = document.querySelectorAll('.postText');

  postText.forEach((p) => {
    p.addEventListener('click', () => {
      let userPost = p.parentNode.parentNode;
      let userPostId = userPost.querySelector('div').dataset.id;
      posts.find((post) => {
        if (post.id == userPostId) {
          const postId = post.id;
          localStorage.setItem("postId", postId);
          location.href = './post.html'
        }
      })
    })
  })

  // 그림 클릭하면 해당 포스트로 이동
  const dataImg = document.querySelectorAll('.image_feed');

  dataImg.forEach((img) => {
    img.addEventListener('click', () => {
      posts.find((post) => {
        if (post.image === undefined) {
          return;
        }
        if (post.image.split(',')[0] == img.src) {
          const postId = post.id;
          localStorage.setItem("postId", postId);
          location.href = './post.html'
        }
      })
    })
  })

  // 댓글 클릭하면 해당 포스트로 이동
  const btnComment = document.querySelectorAll('.img_comment')
  btnComment.forEach((i) => {
    i.addEventListener('click', () => {
      let secComment = i.parentNode.parentNode;
      let userPostId = secComment.dataset.id;
      posts.find((post) => {
        if (post.id == userPostId) {
          const postId = post.id;
          localStorage.setItem("postId", postId);
          location.href = './post.html'
        }
      })

    })
  })


}

//사용자 프로필로 이동하는 로직 1
const profileFeed = document.querySelectorAll('.profile_feed');

profileFeed.forEach((img) => {
  img.addEventListener("click", () => {
    const articleProfile = img.parentNode;
    console.log(articleProfile, "이거 뭐뜨더라요?")
    const profileId = articleProfile.querySelector('div').dataset.id;
    console.log(profileId, "이거뭐나와여");
    // async function getUserId() {
    //   const url = "http://146.56.183.55:3000";
    //   const token = localStorage.getItem("Token");
    //   const res = await fetch(
    //     url + `/user/searchuser/?keyword=${accountname}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-type": "application/json",
    //       },
    //     }
    //   );
    //   const json = await res.json();
    //   json.forEach((data) => {
    //     if (data.accountname === accountname) {
    //     }
    //   });
    // }
    // getUserId();
    localStorage.setItem("searchedUserAccountname", accountname);
    location.href = "./yourprofile.html";
  });
});



// 하트 수 변화하는 함수
async function heartChange(json) {
  const posts = json.posts;
  const content = json.content;
  console.log(posts);

  const likeBtns = document.querySelectorAll(".like_feed");
  likeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e.target.parentNode.parentNode);
      const likedPostContent = e.target.parentNode.parentNode.querySelector("p").textContent.trim();
      const likedPost = json.posts.filter(
        (post) => post.content === likedPostContent
      );
      const likeNumber = e.target.parentNode.querySelector('.likecount_feed');

      if (!likedPost[0].hearted) {
        console.log('help me.....');
        e.target.src = `../images/icon/icon-heart-active.png`;
        getLike(likedPost[0].id);
        likedPost[0].hearted = true;
        likeNumber.innerText = Number(likeNumber.innerText) + 1;
      } else {
        e.target.src = `../images/icon/icon-heart.png`;
        getUnLike(likedPost[0].id);
        likedPost[0].hearted = false;
        likeNumber.innerText = Number(likeNumber.innerText) - 1;
      };
    });
  });
};


function heartedCheck(posts) {
  const article = document.querySelectorAll('article');
  // const heartedContent = document.querySelector(`article:nth-child(2)`);
  // console.log(heartedContent.childNodes);
  posts.forEach((e, index) => {
    console.log(index);
    if (index >= article.length) {
      return;
    }
    if (e.hearted) {
      console.log(e);

      const heartedContent = document.querySelector(`article:nth-child(${index + 1})`);
      // const heartedContent = document.querySelector(`article`);
      console.log(heartedContent, index);
      const heartImg = heartedContent.children[2].querySelector('.icon_feed').querySelector('.like_feed');
      heartImg.src = `../images/icon/icon-heart-active.png`;
    }
  })
}

//게시물 좋아요
async function getLike(postId) {
  const url = `http://146.56.183.55:5050/post/${postId}/heart`;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
}

// 게시물 싫어요
async function getUnLike(postId) {
  const url = `http://146.56.183.55:5050/post/${postId}/unheart`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
}
