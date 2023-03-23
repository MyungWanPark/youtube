# Youtube Side Project 

### Version
[![react version](https://img.shields.io/badge/React-18.2.0-green.svg?style=flat-square)](https://react.dev)
[![node version](https://img.shields.io/badge/Node-18.x-orange.svg?style=flat-square)](https://nodejs.org/en)

### Theme: Youtube (유튜브)

<br/>

> Click the link to view Demo.&nbsp;&nbsp; [Demo 보러가기 ](https://shoppingmall-myungwan.netlify.app)

<br/>

<details open="open">
<summary>Skills Used</summary>
  
- Language: 
    - <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" />

- Framework: 
  - <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
  - Function Component, React Hooks, React Router Dom, React Query(TanStack Query) etc
  
- Test:
  - Unit Test
    - <img src="https://img.shields.io/badge/Jest-C21325?style=flat&logo=Jest&logoColor=white" />
  - E2E Test
    - <img src="https://img.shields.io/badge/Cypress-17202C?style=flat&logo=Cypress&logoColor=white" />
  
- UI: 
  - <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" /> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
  
- State Management: Context API
- Design Pattern: OOP with Dependency Injection
- HTTP Library: 
  - <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white" />
- API for Data:
  - <img src="https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=YouTube&logoColor=white" />
- Icons: React-icons
  
</details>

## Features 
- Show Hot Trending Videos
- Search Video using keyword
- See Video Detail
- Watch Video
- See Related Video
- Unit Test
- E2E Test
- Responsive Website

### Images 
(이미지 클릭 시, 큰 화면으로 보실 수 있습니다.)

- [Main Pages](#Videos)
  - [Index](#Index)
  - [Search Video](#Search-Video)
  - [Video Detail](#Video-Detail)
  - [Related Video](#Related-Video)
- [Test](#Test)
  - [Test Coverage](#Test-Coverage)

<br/>

## Videos

### Index
랜딩 페이지 입니다. <br/>
가장 인기 있는 비디오들의 목록을 보여줍니다.

<br/>

<img width="1279" alt="index-popular-min" src="https://user-images.githubusercontent.com/56289900/227114848-03e161b7-4ef7-4ce3-8a42-cfd125f23e11.png">

<br/>

### Search Video
보고 싶은 비디오의 제목을 검색합니다. <br/>
검색 후, 그와 관련된 비디오들의 목록을 확인할 수 있습니다. <br/>
아래 예시는 'messi goal'을 검색한 결과 입니다. <br/>
Youtube API의 할당량 제한으로 인해, 배포된 사이트에는 mock video data 를 사용하였습니다. <br/>
따라서 정해진 비디오만 나오게 됩니다.

<br/>

<img width="1280" alt="search-min" src="https://user-images.githubusercontent.com/56289900/227114858-b2dcf3f7-541f-4d62-8cc5-9ad52f59c1e0.png">

<br/>

### Video Detail
보고 싶은 비디오 썸네일을 클릭하면 상세 비디오 화면으로 이동합니다. <br/>
Play Button 을 누르면 비디오를 볼 수 있습니다. <br/>
비디오 플레이어 밑에는 비디오 제목, 채널 이름, 채널 이미지, 비디오 설명을 보여줍니다. <br/>
오른쪽에는 지금 보고 있는 비디오와 연관된 비디오들의 목록을 보여줍니다.

<br/>

<img width="1280" alt="video-detail-min" src="https://user-images.githubusercontent.com/56289900/227116329-22c61243-8aaa-4686-a371-c6b9fc9c4075.png">

<br/>

### Related Video
상세 비디오 화면에서 연관된 비디오를 클릭했을 때 그 비디오의 상세 화면으로 이동합니다. <br/>

<br/>

<img width="1280" alt="related-video-min" src="https://user-images.githubusercontent.com/56289900/227114855-f83a8102-93c7-4d86-9819-27cd22b13301.png">

<br/>

## Test

### Test Coverage
Unit Test의 결과입니다. <br/>
Main Feature 테스트는 모두 실시하였으며, 코드 전체의 50.54%를 커버하였습니다.

<br/>

<img width="1279" alt="test-coverage-min" src="https://user-images.githubusercontent.com/56289900/227119265-c6b8e23c-1373-430b-8db7-f6ce4f8da132.png">

<br/>
