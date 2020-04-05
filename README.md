# 1. 프로젝트 소개
미세먼지 공공 API를 이용해 미세먼지 등급과 다음날 미세먼지 예보를 보여주는 애플리케이션 개발 프로젝트   

## 1.1 프로젝트 요구사항 분석 스프레드시트 
[https://docs.google.com/spreadsheets/d/1t73Jl4WdVuC1CdhwEmi7rrRBNPvr5EMW1ZvDXX09o7Q/edit#gid=0](https://docs.google.com/spreadsheets/d/1t73Jl4WdVuC1CdhwEmi7rrRBNPvr5EMW1ZvDXX09o7Q/edit#gid=0)

# 2. 서비스 링크
[서비스 링크]()

# 3. 사용기술
- API 개발 : 스프링 프레임워크
- API 배포 : Heroku
- Mock API 개발 : PostMan
- DB : Spring JDBC

# 4. 개발내용
- 아이디, 이메일, 휴대폰번호 중복 확인하는 API 개발 
- 

# 5. 어려움과 해결책
## 5.1 어려움 : Cors (Cross Origin Resource Sharing) 문제
- 문제 : 클라이언트 요청 시 Cors 이슈가 발생해서 데이터가 전달되지 않는 문제 
- 해결 : 다른 Origin(포트)의 요청에도 응답할 수 있도록 Cors 설정을 추가한 후 배포 

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
      // 모든 uri에 대해 http://localhost:18080, http://localhost:8180 도메인은 접근을 허용한다.
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:18080","http://localhost:8180");

    }
}
```
## 5.2 어려움 : 
- 문제 : 아이디나 이메일 중복 확인하는 요청에 응답을 JSONObject를 보내는데 iOS 개발자 요청에 다른 데이터가 응답되는 문제 
- 해결 : Json 데이터를 직접 전달하지 않고 상태 코드를 보내는 방식으로 변경 ex) 200(ok) 204(No Content)

# 6. Rest API 문서
## 기능 별 JSON 형식 
- 중복 userId 확인 : 
```
Request : { "userId" : "guswns1659"}
Response : { "userId" : "guswns1659", "validation" : "false"}
```

- 중복 email 확인 : 
```
Request : { "email" : "zmdk1127@naver.com"}
Response : { "email" : "zmdk1127@naver.com", "validation" : "false"}
```

- 중복 Phone number : 
```
Request : { "phoneNumber" : "01012341234" }
Response : { "phoneNumber" : "01012341234", "validation" : "false" } 
```

- 로그인 : 
```
Request : { "userId" : "guswns1659", "password" : "1234" }
Response : 
- 로그인 성공 시 : { "userId" : "guswns1659", "validation" : "true" }  
- 로그인 실패 시 : { "userId" : "guswns1659", "validation" : "false" }
```

- 회원가입 : 

```
Request : 
{ "userId" : "guswns1659",
  "password" : "1234",
  "name" : "jack",
  "gender" : "0"
  "birthDate" : "1970-09-10"
  "email" : "zmdk1127@naver.com"
  "phoneNumber" : "01012341234",
  "favorite" : ['관심사1', '관심사2', '관심사3']}

Response : 
- 로그인 성공 시 : { "userId" : "guswns1659", "validation" : "true" }  
- 로그인 실패 시 : { "userId" : "guswns1659", "validation" : "false" }
```

### URL 
- 중복 ID 확인 : POST https://hyunjun.herokuapp.com/user-id-validation
- 중복 EMAIL 확인 : POST https://hyunjun.herokuapp.com/email-validation
- 중복 핸드폰 번호 확인 : POST https://hyunjun.herokuapp.com/phone-number-validation
-  : POST https://hyunjun.herokuapp.com/user-registration
- 로그인 : POST https://hyunjun.herokuapp.com/login
