
# 프로젝트 이름: **CommNet**  
> **설명**: 회원 가입, 로그인, 게시판 기능을 제공하는 커뮤니티 웹 애플리케이션. 이 프로젝트는 React를 사용한 프론트엔드와 Spring Boot를 사용한 백엔드로 구성되어 있습니다.

---

# 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [기술 스택](#기술-스택)
3. [구성](#구성)
4. [설치 및 실행 방법](#설치-및-실행-방법)
    - [백엔드 실행](#백엔드-실행)
    - [프론트엔드 실행](#프론트엔드-실행)
5. [기능](#기능)
6. [API 명세](#api-명세)
7. [향후 개선 사항](#향후-개선-사항)

---

# 1. 프로젝트 개요
CommNet은 사용자가 가입하고, 로그인하여 게시판에 글을 작성할 수 있는 커뮤니티 웹 애플리케이션입니다. Spring Boot를 이용한 백엔드와, React를 이용한 프론트엔드로 구성되어 있으며 REST API로 통신합니다. 

---

# 2. 기술 스택

## 백엔드:
- **Java 17**
- **Spring Boot 3**
- **Spring Security**: JWT 기반 인증
- **JPA (Hibernate)**: 데이터베이스 연동
- **MySQL**: 데이터베이스

## 프론트엔드:
- **React** (16+)
- **React Router**: 페이지 라우팅
- **Axios**: HTTP 통신
- **CSS**: 스타일링

---

# 3. 구성

\`\`bash

C:\swork\CommNet

├── backend

│   └── commnet-be

│       ├── src

│       └── build.gradle

├── frontend

│   └── commnet-fe

│       ├── src

│       └── package.json

├── .gitignore

├── README.md

└── ...

\`\`


- **backend/commnet-be**: Spring Boot 기반 백엔드 코드
- **frontend/commnet-fe**: React 기반 프론트엔드 코드

---

# 4. 설치 및 실행 방법

## 백엔드 실행

1. **프로젝트 클론**:
    \`\`bash
    git clone https://github.com/ddj82/CommNet.git
    cd CommNet/backend/commnet-be
    \`\`

2. **의존성 설치 및 빌드**:
    \`\`bash
    ./gradlew build
    \`\`

3. **MySQL 데이터베이스 설정**:
    - \`application.properties\` 파일에서 MySQL 설정을 맞춰주세요:
    \`\`properties
    spring.datasource.url=jdbc:mysql://localhost:3306/commnet
    spring.datasource.username=root
    spring.datasource.password=yourpassword
    \`\`

4. **애플리케이션 실행**:
    \`\`bash
    ./gradlew bootRun
    \`\`

## 프론트엔드 실행

1. **프로젝트 클론**:
    \`\`bash
    git clone https://github.com/ddj82/CommNet.git
    cd CommNet/frontend/commnet-fe
    \`\`

2. **의존성 설치**:
    \`\`bash
    npm install
    \`\`

3. **애플리케이션 실행**:
    \`\`bash
    npm start
    \`\`

---

# 5. 기능
- **회원가입 및 로그인** (JWT 인증 기반)
- **게시판**: 글 작성, 목록 조회
- **로그아웃**: 사용자 로그아웃 처리

---

# 6. api 명세

## 로그인 API

- **URL**: \`/api/auth/login\`
- **Method**: \`POST\`
- **Request Body**:
    \`\`json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    \`\`

- **Response**:
    \`\`json
    {
      "token": "JWT_TOKEN",
      "userId": 1,
      "name": "John Doe"
    }
    \`\`

## 게시판 API

- **URL**: \`/api/board\`
- **Method**: \`GET\`
- **Description**: 게시물 목록을 가져옵니다.

---

# 7. 향후 개선 사항
- **댓글 기능 추가**: 게시글에 댓글을 달 수 있는 기능을 추가할 예정.
- **게시글 검색 기능**: 키워드를 통해 게시글을 검색할 수 있는 기능.
- **프로필 페이지**: 사용자 프로필 페이지 추가.
