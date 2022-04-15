
# [감귤마켓] 쇼핑몰 및 SNS 통합 서비스

## 1. 프로젝트 주제와 기능

### 1.1 프로젝트 주제
'감성82' 서비스는 자신의 스토어에서 판매하고 있는 상품을 등록하여 홍보할 수 있는 SNS입니다. 상품을 등록하지 않아도 일상을 공유하며 즐거운 SNS 활동을 할 수 있다. 

### 1.2 핵심 기능
- 회원가입/로그인
- 회원 간 팔로우
- 게시글 CRUD 
- 회원 검색

## 2. 배포 URL
- [:tangerine: 감귤마켓 :tangerine:](https://useon.github.io/mandarin-market/src/pages/login)
- http호환 문제 이슈 : [감귤마켓.ver2로 이동](https://github.com/postop09/mandarine_market_ver2)

## 3. 프로젝트 구조와 개발 일정

### 3.1 프로젝트 구조

```
├─.github
│  └─ISSUE_TEMPLATE
├─.vscode
└─src
    ├─css
    ├─images
    │  └─icon
    ├─js
    └─pages
```

### 3.2 개발일정

- 기간 : 2022.1.3(월) ~ 2022.1.16(일) / 14일

## 4. 멤버와 역할 분담

### 4.1 멤버
- 곽성재
- 김유선
- 김기영
- 김초연
- 조윤식

### 4.2 역할 분담
- 로그인, 회원가입 : 곽성재
- 홈(피드), 검색 : 김유선
- 유저 프로필 : 김기영 
- 프로필 수정, 상품 등록, 팔로워 목록 : 김초연
- 게시글 상세보기/등록, 채팅 : 조윤식

## 5. UI
- 전체 피그마 이미지
- 구역별 피그마 이미지입니다
- 각 페이지 설명 및 기능구현 목표

[감귤마켓 피그마](https://www.figma.com/file/Gn6gQJdYwImYsEYSzBXhud/%EB%A9%8B%EC%82%AC_%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%8A%A4%EC%BF%A8?node-id=39%3A1814)

### 5.1 전체 피그마
![전체 피그마](https://user-images.githubusercontent.com/93017923/149694713-bc5a085e-86e6-446b-8070-10a8692bf977.PNG)

#### 5.1.1 하단 탭 메뉴(공통)
- 하단 탭 메뉴는 홈, 채팅, 게시물 작성, 프로필 4개의 메뉴로 구성되어 있습니다.
- 모든 페이지는 페이지 경로에 해당하는 탭 메뉴가 활성화됩니다.

#### 5.1.2 좋아요 버튼(공통)

- 게시글이 나타나는 모든 페이지에 해당합니다.
- 게시글 하단에는 하트 모양에 좋아요 버튼이 있습니다.
- 빈 하트를 클릭하면 색이 칠해진 하트로 변하고, 색이 칠해진 하트를 누르면 빈 하트로 변합니다.

#### 5.1.3 모달 버튼(공통)

- 우측 버튼을 클릭하면 모달이 화면 하단에 나타납니다.
- 헤더에 있는 버튼을 클릭하면 설정 및 개인정보와 로그아웃 모달이 나타납니다.
- 게시글 우측 상단에 위치한 버튼을 클릭했을 경우
    - 내가 작성한 게시글일 경우 : 삭제, 수정 버튼이 나타납니다.
    - 다른 사용자가 작성한 게시글일 경우 : 신고하기 버튼이 나타납니다.

- 댓글 우측 상단에 위치한 버튼을 클릭했을 경우
    - 내가 작성한 댓글일 경우 : 삭제 버튼이 나타납니다.
    - 다른 사용자가 작성한 댓글일 경우 : 신고하기 버튼이 나타납니다.
- 로그아웃, 삭제, 신고 버튼을 누르면 확인 메시지 모달창이 나타나야 하고, 취소 버튼을 누르면 모달은 사라집니다.

### 5.2 로그인/회원가입 피그마
![로그인 피그마](https://user-images.githubusercontent.com/93017923/149695008-64c43779-7e73-4365-bf09-e7d464992051.PNG)

#### 5.2.1 로그인
- 로그인은 **로그인 메인 화면**과 **이메일 로그인 화면**으로 나눠져 있습니다.
- 로그인 메인 화면에서 `이메일로 로그인` 을 클릭하면 이메일로 로그인할 수 있는 화면으로 이동합니다.
- 이메일과 비밀번호를 모두 입력하면 `다음` 버튼이 활성화 됩니다. 입력되지 않은 입력창이 있다면 버튼은 활성되지 않습니다.
- `로그인` 버튼을 클릭하면 이메일 주소와 로그인에 대한 유효성 검사를 진행하며, 이메일 주소 또는 비밀번호가 일치하지 않을 경우에는 경고 문구가 나타납니다.
- 입력창에 focus 될 경우에는 선의 색이 변합니다.(회색, #DBDBDB → 주황색, #F26E22)

#### 5.2.1 회원가입
- 로그인 메인 화면에서 `회원가입` 을 누르거나 이메일 로그인 화면에서 `이메일로 회원가입` 을 누르면 회원가입 화면이 나타납니다.
- 이메일 주소 또는 비밀번호를 입력하고 입력창에서 포커스를 잃으면 바로 유효성 검사가 진행되고 통과하지 못한 경우 경고 문구가 각 입력창 하단에 표시됩니다.
- 이메일 주소의 형식이 유효하지 않거나 이미 가입된 이메일일 경우,  또는 비밀번호가 6자 미만일 경우에는 각 입력창 하단에 경구 문구가 나타납니다.
- 입력창에 focus 될 경우에는 선의 색이 변합니다.(회색, #DBDBDB → 주황색, #F26E22)
- 작성이 완료된 후, 유효성 검사를 통과할 경우 `다음` 버튼이 활성화되며, 버튼을 클릭하면 프로필 설정 폼이 나타납니다.
- 프로필 설정에 필요한 프로필 사진, 사용자 이름(2~10자 이내), 계정 ID, 소개를 입력받습니다.
    - 프로필 사진은 등록하지 않을 경우 기본 이미지가 등록되게 합니다.
    - 사용자 이름과 소개는 다른 사용자와 중복될 수 있습니다.
    - 계정 ID는 중복이 불가합니다.
    - 프로필 설정에서도 같은 방식으로 유효성 검사가 진행됩니다. 계정 ID에 대한 중복 유무와 형식을 검사합니다.

### 5.3 홈/검색 피그마
![홈 검색 피그마](https://user-images.githubusercontent.com/93017923/149695352-b8724a41-0ae5-4081-b7e7-71440671aaeb.PNG)

#### 5.3.1 감귤마켓 피드(홈 화면)
- 감귤마켓 피드는 사용자들이 올린 게시글들이 표시되는 페이지입니다.
- 감귤마켓 피드에는 자신이 팔로우한 사용자의 게시글만 확인할 수 있습니다.
- 팔로우한 사용자가 없을 경우와 내가 팔로우한 사용자가 올린 게시글이 없는 경우 "유저를 검색해 팔로우 해보세요!" 문구와 함께 `검색하기` 버튼이 표시됩니다.

#### 5.3.2 검색
- 감귤마켓 피드 상단에 돋보기 버튼(검색 버튼)을 클릭하면 표시되는 페이지입니다.
- 사용자 이름을 검색할 수 있는 페이지입니다.

### 5.4 마이프로필 피그마
![마이프로필 피그마](https://user-images.githubusercontent.com/93017923/149695482-43d92d71-37c0-43d4-baa1-4b9299b56c3f.PNG)

#### 5.4.1 사용자 프로필 페이지
- 사용자 프로필 페이지에서는 사용자 이름, 계정 ID, 소개, 팔로워 및 팔로잉 수, 판매 상품, 그리고 사용자가 업로드한 게시글을 확인할 수 있습니다.
- 사용자 정보 하단에는 팔로우 버튼이 있습니다. 팔로우 버튼을 클릭하면 언팔로우 버튼으로 바뀌어야 합니다.
- 팔로워 및 팔로잉 수를 클릭하면 팔로워, 팔로잉 사용자 목록이 표시됩니다.
- 판매 중인 상품 섹션은 등록한 상품이 없을 경우에는 표시되지 않습니다.
- 게시글 섹션에서는 목록형과 앨범형으로 게시글들을 확인할 수 있습니다. 기본형은 목록형이며, 이미지가 없는 게시글을 경우에는 앨범형에서는 표시되지 않습니다.
- 또한 사용자가 올린 게시글이 없을 경우에는 게시글이 나타나지 않습니다.
- 나의 프로필 페이지일 경우
    - 프로필 수정 버튼과 상품 등록 버튼이 표시됩니다.
    - 판매 중인 상품을 클릭하면 하단에 상품 삭제, 수정, 웹사이트에서 상품 보기 버튼이 포함된 메뉴가 나타납니다. (단, 나의 프로필 페이지가 아닐 경우 상품을 클릭하면 바로 상품 판매 사이트로 이동됩니다.)

### 5.5 팔로우 리스트/프로필 수정/상품 등록 피그마
![프로필수정 상품 등록 피그마](https://user-images.githubusercontent.com/93017923/149695776-55adef4b-93d5-4738-a26c-cac36fe45103.PNG)

#### 5.5.1 내 프로필 수정
- 나의 프로필 페이지에서 `프로필 수정` 버튼을 클릭하면 프로필을 수정할 수 있는 페이지가 나타납니다.
- 입력창에 대한 명세는 회원가입에서의 프로필 설정과 동일합니다. 유효성 검사가 통과되지 않을 경우 `저장` 버튼이 활성화되지 않습니다.

#### 5.5.2 상품 등록
- 나의 프로필 페이지에서 `상품 등록` 버튼을 클릭하면 상품을 등록할 수 있는 페이지가 나타납니다.
- 상품 이미지, 상품명, 가격, 판매링크를 입력받을 수 있으며, 모든 입력이 완료되면 `저장` 버튼이 활성화됩니다.
- 상품명은 2~15자 이내로 입력되게 하고, 가격은 숫자를 입력하면 자동으로 원단위로 변환시킵니다.

### 5.6 게시글 상세/게시글 업로드/채팅 피그마
![게시글 채팅 피그마](https://user-images.githubusercontent.com/93017923/149696065-e8856f22-74db-492f-afe8-b401205eb2e8.PNG)

#### 5.6.1 게시글 댓글 페이지
- 게시글 하단에 말풍선 아이콘을 클릭하면 댓글을 확인하고 입력할 수 있는 페이지가 나타납니다.
- 댓글 입력창에 텍스트를 입력하면 `게시` 버튼이 활성화됩니다.

#### 5.6.2 게시글 작성 페이지
- 게시글을 작성할 수 있는 페이지로, 하단 메뉴바에서 `게시글 작성` 을 클릭하면 표시됩니다.
- 글이 입력되거나 사진이 업로드 되면 `업로드` 버튼이 활성화되고, 버튼을 누르면 게시글이 업로드됩니다.
- 사진은 우측 하단 버튼을 클릭하면 업로드할 수 있으며, 최대 3장까지 업로드 가능합니다.

#### 5.6.3 채팅 목록
- 현재 대화가 진행 중인 채팅 목록이 표시됩니다.
- 내가 읽지 않은 메시지가 있는 채팅방인 경우 프로필 사진 좌측 상단에 작은 원으로 표시됩니다.

#### 5.6.4 채팅방
- 채팅 목록에서 목록 아이템을 클릭하면 해당 채팅방이 나타납니다.
- 채팅 입력창에서 텍스트가 입력되면 `전송` 버튼이 활성화됩니다.
- 이미지 버튼을 클릭하고 이미지를 선택하면 전송 버튼이 활성화됩니다.
- 채팅방 상단 우측 버튼을 클릭하면 아래와 같은 모달이 화면 하단에 나타납니다.

## 6. 내가 기여한 상세 기능

### 6.1 게시글 상세보기 페이지

#### 6.1.1 UI
![image](https://user-images.githubusercontent.com/93017923/154859148-9157e80d-00f3-4c18-af00-a91abaf556b6.png)
- 최대 3장까지 이미지 출력, 한 장일 경우 슬라이드 기능 및 버튼 삭제
- 댓글 입력창에 글이 입력되지 않으면 '게시' 비활성화
- 메뉴 버튼 클릭 시 신고 및 수정 모달창 출력

#### 6.1.2 API
- 목록의 게시글을 클릭하면 상세보기 페이지로 이동
- 작성자, 게시글 내용, 작성일시, 좋아요/댓글 수 서버로부터 데이터 출력
- 게시글 관련 댓글 출력

### 6.2 게시글 업로드 페이지

#### 6.2.1 UI
![image](https://user-images.githubusercontent.com/93017923/154859662-7d44a1dc-0734-4fb5-8f8d-509169928d54.png)
- 게시글 작성/이미지를 선택하지 않으면 '업로드' 비활성화
- 게시글의 양에 따라 입력창 높이값 변화
- 최대 3장의 이미지를 선택할 수 있으며, 2장 이상 선택시 이미지 슬라이드
- 새로운 이미지를 선택하면, 선택되어 있던 이미지는 초기화

#### 6.2.2 API
- 게시글 작성
- 게시글 및 이미지 서버로 전송
- 게시글 출력 확인

### 6.3 채팅목록
- 기능 미구현
#### 6.3.1 UI
![image](https://user-images.githubusercontent.com/93017923/154859948-1423ae4e-ad8a-4dc6-996d-16deb139b30d.png)
- 뒤로가기 클릭 시 이전페이지

### 6.4 채팅방
- 기능 미구현
#### 6.4.1 UI
![image](https://user-images.githubusercontent.com/93017923/154860072-fa61e9d9-3722-4d8a-9299-77db259a1f83.png)
- 메뉴 클릭 시 '채팅방 나가기' 모달창 출력
- 댓글을 작성하지 않으면 '전송' 비활성화

## 7. 개발하며 배운점/느낀점
- **git 사용** : git 명령어 사용, 의미 단위/기능 단위 커밋, 기능 및 역할 별 브랜치 활용, 이슈 관리, 칸반 프로젝트까지, 처음에는 전혀 모르던 git에 대해서 많이 배우고, 실제로 팀프로젝트를 진행하며 활용할 수 있게 되었다. git 자체만으로도 진입장벽이라는 말이 괜히 나오는 말이 아니라는 것을 느꼈지만, 팀 프로젝트를 진행하며 조금은 극복한 기분이다!
- **API 연동** : 나는 데이터를 다룰 수 있어야 비로소 진정한 개발자가 되었다고 생각한다. 지금까지 단순히 JavaScript로 UI적인 기능들만을 제작했다면, 이번 프로젝트를 진행하며, fetch, json을 실제로 사용한 것이 나에겐 너무 좋은 경험이었다. 이 프로젝트를 진행하면서, 서버와의 연결/연동에 대한 부족함과 필요성이 더 느껴졌고, 더 잘 활용할 수 있도록 노력해야겠다.
- 팀원들 모두 새벽까지 열심히 하면서, 힘들기도 했다. 하지만 함께 하니 힘도 나고, 서로 언제든 질문하고 배울 수 있다는 점이 좋았다. 마지막까지 이상없이 종료했음에 우리 팀원들에게 감사를 전한다.
