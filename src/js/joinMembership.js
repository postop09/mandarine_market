// ------------------ 이메일 비밀번호 섹션 ------------------- 
// 유효성검사와 버튼활성화를 위한 변수선언
const btnNext = document.querySelector(".btn_next")
const formSignIn = document.querySelector('.form_signIn');

const email = document.querySelector('#inp_loginEmail');
const pwd = document.querySelector('#inp_loginPw');

const pwdWarn = document.querySelector(".txt_pwdWarn");

// 이메일 유효성검사 정규표현식
const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
// 키업 => 키를 뗄때마다 돌아가기 때문에 실시간 느낌이 남
// 체인지 => 의미상 이게 맞는 느낌이지만 실시간 느낌이 안남
email.addEventListener('keyup', () => {
  if (exptext.test(email.value) == false) {
    document.querySelector(".txt_emailWarn.RegExp").style.display = "inline";
  } else if (exptext.test(email.value) == true) {
    document.querySelector(".txt_emailWarn.RegExp").style.display = "none";
  } 
});


// 비밀번호 유효성검사 (6자 이상)
pwd.addEventListener('keyup', () => {
  if (pwd.value.length > 5) {
    document.querySelector(".txt_pwdWarn").style.display = 'none';
  } else {
    document.querySelector(".txt_pwdWarn").style.display = 'inline';
  }
});


// 버튼활성화 => disabled 쓰기
formSignIn.addEventListener('input', () => {
  btnAttrChange(); 
});

function btnAttrChange() {
  if (exptext.test(email.value) && pwd.value.length > 5) {
    btnNext.disabled = false;
  } else {
    btnNext.disabled = true;
  }
};

// 프로필설정으로 넘어가기 => 섹션을 숨기고 보여주는 처리임
const $signIn = document.querySelector('.signIn');
const $setProfile = document.querySelector('.setProfile');

// 이메일 중복체크 함수
const url = "http://146.56.183.55:5050";
async function checkEmailValid(email) {
  const emailData = {
    "user": {
      "email":email
    }
  }
  const res = await fetch(url+'/user/emailvalid', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body:JSON.stringify(emailData)
  })
  const json = await res.json();
  // console.log(json);
  return json.message == "사용 가능한 이메일 입니다." ? true : false
}

btnNext.addEventListener("click", async () => {
  // 클릭이벤트 발생 시의 값을 불러와야 하기에 이벤트 함수 안에서 선언
  const emailVal = email.value;
  const emailValid = await checkEmailValid(emailVal)
  console.log(emailVal);
  console.log(emailValid);
  if (emailValid) {
    $signIn.style.display = "none"
    $setProfile.style.display = "block"
  } else {
    document.querySelector(".txt_emailWarn.Duplicate").style.display = "inline";
  }
})
// 지울때 중복된이메일 입니다 없애기
email.addEventListener("keyup", () => {
  document.querySelector(".txt_emailWarn.Duplicate").style.display = "none";
})
// 사진 데이터 보내기
// 데이터를 폼 형식으로 보내주는걸 js로 컨트롤 하는거임
const imgPre = document.querySelector("#img_pre");
async function imageUpload(files){
  const formData = new FormData();
  formData.append("image", files[0]);//formData.append("키이름","값")
  console.log(formData);
  const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
      method: "POST",
      body : formData
  })
  const data = await res.json()
  const productImgName = data["filename"];
  console.log(productImgName); // 1642158806566.png 요런식임
  return productImgName
}

// 사진 데이터 받기 + 뿌리기?
// 이제 서버에 내 사진이 잘 가있다.
// 새탭에서 이미지를 열어보면 위에 주소가 보이는것처럼!
async function profileImage(e) {
  // 여기서 말하는 이벤트란 인풋이 변하는것=>사진을올리는것
  const files = e.target.files
  const result = await imageUpload(files)
  imgPre.src = url+"/"+result // 요청url/123889127.png
  console.log(result) // 1642158806566.png 
}
// 인풋에 변화가 생기면 해당 태그의 소스값을 서버에서 받아온다
document.querySelector("#inp_img").addEventListener("change",profileImage)

// 유효성검사!!! 이름 2~10자 //// 계정아이디 영문,숫자,특수문자(,)(_) + 중복불가

// 이름=>html로 해결?
// 피그마에 보면 공백 없이 10자 적혀 있음
// html min max로는 안되겠다
function nameCheck() {
  const userName = document.querySelector("#inp_name");
  const warnLength = document.querySelector("#warn_length");

  userName.addEventListener('change', () => {
    // console.log(userName.value);
    // console.log(userName.value.length);
    // console.log(userName.value.replace(/(\s*)/g, '').length);

    if (userName.value.replace(/(\s*)/g, '').length < 2 || userName.value.replace(/(\s*)/g, '').length > 10) {
      warnLength.style.display = 'inline';
    } else {
      warnLength.style.display = 'none';
    }
  })
}
nameCheck();

// 계정 아이디 => 영문,숫자,특수문자(.),(_) 
function idCheck() {
  const userId = document.querySelector("#inp_Id");
  const exptext = /^[A-Za-z0-9_.]/;
  const warnExp = document.querySelector("#warn_valid");
  const btnStart = document.querySelector(".btn_start");
  userId.addEventListener('keyup', () => {
    console.log(userId.value)
    if (!exptext.test(userId.value)) {
      warnExp.style.display = 'inline';
    } else if (exptext.test(userId.value)) {
      warnExp.style.display = 'none';
      btnStart.disabled = false
    }
  })
}
idCheck();

// 종합으로 내 프로필설정값 보내기
const submitBtn = document.querySelector(".btn_start");

async function join(){
  const email = document.querySelector("#inp_loginEmail").value;
  const password = document.querySelector("#inp_loginPw").value;
  const userName = document.querySelector("#inp_name").value;
  const userId = document.querySelector("#inp_Id").value;
  const intro = document.querySelector("#inp_intro").value;
  const imageUrl = document.querySelector("#img_pre").src;

  const warnDuplicate = document.querySelector("#warn_userdId");

  try{
      const res = await fetch("http://146.56.183.55:5050/user", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body : JSON.stringify({
              "user": {
                  "email": email,
                  "password": password,
                  "username": userName,
                  "accountname": userId,
                  "intro": intro,
                  "image": imageUrl,
              }
          })
      })
      // 확인
      console.log(res);
      
      const json = await res.json();
      const message = json.message;
      // 확인
      console.log(json);
      console.log(message);

      if(res.status==200){
          console.log("성공^^")
          // 내가 가입성공하면 토큰이랑 아이디를 가져올 수 있나>??
          // localStorage.setItem("Token",json.user.token)
          // localStorage.setItem("Accountname",json.user.accountname)
          // 일단 가입성공시 로그인화면으로 보내주자
          location.href = "./loginEmail.html"
      }
      else{
          console.log(json)
          warnDuplicate.style.display = 'inline';
      }
  }catch(err){
      alert(err)
  }
}
submitBtn.addEventListener("click",join)
