# Mountain Due

메인 페이지 이미지가 들어갈 곳입니다. 

## 📖 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [팀소개](#팀소개)
3. [주요기능](#주요기능)
4. [적용 기술 및 기술적 의사결정](#적용-기술-및-기술적-의사결정)
6. [개발기간](#개발기간)
7. [기술스택](#기술스택)
8. [와이어프레임](#와이어프레임)
11. [Trouble Shooting](#trouble-shooting)

## 👨‍🏫 프로젝트 소개

> ### "클라이밍 정보는? 마운틴 듀."
카카오 지도 API와 유튜브 API를 활용, 클라이밍 장에 대한 정보를 찾기 쉽게 모아 놓은 웹사이트 입니다. 

## 팀소개

- 👑 팀장이라 적고 거의 잡일담당 꼬붕.. 이자 <br> 7세 남아 박민준 담당일진, 625(전쟁 아니고 Yu-Gi-OH! 입니다.) 의 헴 **임지영**

- 🗺️ 지도 총괄 담당 건달  **김호준 (화이트 민준)** (사유는 아래의 이미지를 참고해주세요. 하고 여기다가 넣어주3)

- 🗺️ 지도 상세페이지 담당 윌리웡카  **박가나**

- ▶️ 유튜브 기능 담당 소방수 **박민준 (어둠의 민준)**

- 👤 Auth 담당자 vision **이지원**

## 주요기능

### 🛡 회원가입 및 로그인

- Tanstack query와 supabase의 auth 기능을  이용한 간편한 회원가입 및 로그인 기능을 제공합니다.

- 회원가입: 닉네임, 이메일, 비밀번호를 입력하여 간단히 계정을 생성할 수 있습니다.

- 로그인: 기존에 가입한 이메일과 비밀번호로 안전하게 로그인할 수 있습니다.

- 비밀번호 변경 : 사용자가 비밀번호를 잊어버렸을 경우, 이메일을 통한 인증으로 비밀번호를 변경할 수가 있습니다. 

<details>
<summary>미리보기</summary>
<div markdown="1">

- 회원가입
<img width="1915" alt="회원가입 페이지" src="https://github.com/user-attachments/assets/503da1ac-900c-45e7-87de-d1d772e22110">
 
- 로그인
<img width="1915" alt="로그인 페이지" src="https://github.com/user-attachments/assets/66c3146e-2f51-4e3e-a005-64a995ac4c61"> 

<br>
</div>
</details>

### 📝 프로필 수정

- 미정

<details>
<summary>미리보기</summary>
<div markdown="1">

- 프로필 수정
프로필 수정 기능이 있다면 들어갈 예정입니다.

<br>
</div>
</details>

### 🖋 지도

- 지도 

<details>
<summary>미리보기</summary>
<div markdown="1">

- 지도 
이미지가 들어갈 곳입니다. 

<br>
</div>
</details>

### ▶️ Youtube

- 유튜브 페이지에선 흥미로운 클라이밍 동영상과 초심자들을 위한 동영상을 확인할 수 있습니다. 
- search API가 아닌, playlistItem을 활용하여 API의 할당량을 확 줄여 많은 사용자를 받을 수 있게끔 하였습니다. 
- useInfinityQuery 기능을 활용하여, 더보기 기능을 구현하였습니다. 

<details>
<summary>미리보기</summary>
<div markdown="1">

- 유튜브 흥미로운 클라이밍 동영상.
<img width="1908" alt="유튜브 페이지" src="https://github.com/user-attachments/assets/96b4662e-9e18-4592-8608-f898d018f681">

<br>
</div>
</details>

## 적용 기술

### Redux Toolkit

### Redux-persist

### Tanstack query

### Supabase

### React-slick

### React-toastiy

## ⏲️ 개발기간

- 2024.11.29(금) ~ 2024.12.4(수)

## 📚️ 기술스택

### ✔️ Language

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### ✔️ Version Control

![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

### ✔️ IDE

![VSCode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

### ✔️ Framework / Library
`@reduxjs/toolkit`: `^2.4.0`
`@supabase/supabase-js`: `^2.46.2`
`@tanstack/react-query`: `^5.61.5`
`@tanstack/react-query-devtools`: `4`
`axios`: `^1.7.8`
`persist`: `^0.2.7`
`react`: `^18.3.1`
`react-dom`: `^18.3.1`
`react-hook-form`: `^7.53.2`
`react-icons`: `^5.3.0`
`react-redux`: `^9.1.2`
`react-router-dom`: `^7.0.1`
`react-slick`: `^0.30.2`
`react-toastify`: `^10.0.6`
`redux`: `^5.0.1`
`redux-persist`: `^6.0.0`
`tailwind`: `^4.0.0`


### ✔️ Deploy

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### ✔️ Database Manage System

![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)

## 와이어 프레임

<img width="1451" alt="와이어프레임1" src="https://github.com/user-attachments/assets/9444d799-356e-4c60-84d6-387636651a17">
<img width="839" alt="와이어프레임2" src="https://github.com/user-attachments/assets/296e279b-4827-4c9c-ba83-c3737620357d">
<img width="430" alt="와이어프레임3" src="https://github.com/user-attachments/assets/b7fa715d-a63d-438d-a1f4-f1ca8b5db310">
<img width="275" alt="와이어프레임4" src="https://github.com/user-attachments/assets/f0710416-0820-4127-b70f-88ac45d4e265">
<img width="377" alt="와이어프레임5" src="https://github.com/user-attachments/assets/edc8d9b2-37a9-484a-ba38-8d15bae8ffc0">

## Trouble Shooting

## **유튜브 Search API 대체하기: 비용 효율적인 방법 찾기**

아웃소싱 프로젝트를 진행하며, 유튜브 API를 활용해 클라이밍 관련 동영상을 제공하는 기능을 구현했다.

하지만 유튜브 API의 할당량 문제로 인해 비용 효율적인 대안을 찾는 과정에서 몇 가지 중요한 트러블슈팅 과정을 겪었다. 이번 글에서는 문제 해결 과정을 상세히 정리해 본다.

### **1. 문제 상황: Search API의 높은 비용**

유튜브 API는 무료로 제공되지만,  **할당량**이라는 제약이 있다. 프로젝트에서 사용하려던  **Search API**는 다음과 같은 문제를 안고 있었다.

#### **할당량 문제**

-   유튜브 API는 하루에 최대  **10,000 할당량**이 주어진다.
-   **Search API**는 호출당  **100 할당량**을 소모한다.
-   예를 들어, 100개의 요청을 보내면 하루 할당량이 모두 소진된다.

### **2. 해결 방안: Playlist API로 대체**

#### **Playlist API의 장점**

**PlaylistItems API**는 호출당  **1 할당량**만 소모한다.  
Search API를 사용하던 기능을 Playlist API로 대체하면 하루에 훨씬 많은 요청을 처리할 수 있다.

#### **PlaylistItems API를 활용한 코드**

우선, 재생 목록 ID를 기반으로 데이터를 가져오는 함수를 작성했다.


```
const  paramsClimbing  = {
part:  "snippet",
maxResults:  6, // 한 번에 가져올 동영상 개수
playlistId:  "PLQw_lIekogqOZpOzmzpMzfDjksS9FQxPv", // 클라이밍 관련 재생목록 ID
key:  API_KEY, // 유튜브 API 키
};

  

export  const  getClimbResults  =  async (pageToken  =  "") => {
try {
const  response  =  await  youtubeAPI.get("/playlistItems", {
params: {
...paramsClimbing,
pageToken, // 다음 페이지를 위한 토큰
},});

console.log("YouTube API response:", response);
return  response.data;
} catch (error) {
console.error("Error fetching climb results:", error);
throw  error;
}
};
```
### **3. Infinite Query로 무한 스크롤 구현**

Playlist API를 기반으로 **TanStack Query의 useInfiniteQuery**를 사용해 데이터를 페이지 단위로 로드했다.

#### **Infinite Query 코드**

```
const {
data: climbResult,
fetchNextPage: fetchNextClimb,
hasNextPage,
isFetchingNextPage,
} =  useInfiniteQuery({
queryKey: ["climbResults"], // 쿼리 키
queryFn:  fetchClimbResults, // 데이터 패칭 함수
getNextPageParam: (lastPage) =>  lastPage.nextPageToken  ||  undefined, // 다음 페이지 토큰
select: (data) => {
return  data.pages.map((page) => ({
items:  page.items.map((item) => ({
id:  item.snippet.resourceId.videoId, // 동영상 ID
title:  item.snippet.title, // 동영상 제목
thumbnail:  item.snippet.thumbnails.high.url, // 썸네일 URL
})),
nextPageToken:  page.nextPageToken,
}));
},
});
```

#### **코드 설명**

1.  **쿼리 함수**: fetchClimbResults를 호출해 데이터를 가져온다.
2.  **getNextPageParam**: 마지막 페이지의 nextPageToken을 기준으로 다음 데이터를 요청한다.
3.  **select**: API 응답 데이터를 가공해 클라이언트에서 사용하기 쉽게 변환한다.

### **4. 더보기 버튼 구현 및 UI/UX 개선**

무한 스크롤의 마지막 페이지에서는 "더보기" 버튼을 숨겨 UX를 개선했다.

```
{hasNextPage  && (
<Btn
onClick={() => {
fetchNextClimb(); // 다음 페이지 데이터 요청
}}
>
더 보기
</Btn>
)}
```


-   **hasNextPage**: 다음 페이지가 없을 경우 버튼을 렌더링하지 않는다.
-   버튼 클릭 시 fetchNextClimb()를 호출해 다음 데이터를 가져온다.

### **5. 서비스에 적용한 최적화 포인트**

#### **1) 재생 목록 수동 관리**

-   원하는 동영상을 포함하는 재생 목록을 직접 제작해 API 요청 시 불필요한 데이터를 제거했다.

#### **2) 할당량 효율 극대화**

-   Search API에서 Playlist API로 전환함으로써, 100배 효율적인 할당량 사용이 가능해졌다.

#### **3) 데이터 구조 변경에 따른 수정**

-   Playlist API의 응답 구조가 기존 Search API와 약간 달랐다.
-   id 필드가 item.snippet.resourceId.videoId로 바뀌었으므로 이를 반영해 코드를 수정했다.

### **6. 배운 점**

1.  **할당량 제한의 현실적인 문제**  
    유료 API를 무작정 사용하기보다는, 프로젝트에 적합한 대안을 찾는 것이 중요하다.
2.  **API 응답 데이터 구조의 이해**  
    API 응답 구조를 잘 이해하고, 필요한 데이터만 가공해 사용하는 습관이 필요하다.
3.  **UI/UX의 중요성**  
    "더보기" 버튼을 동적으로 숨기고, 효율적인 페이지 로딩을 구현하면서 사용자 경험을 크게 향상시킬 수 있었다.