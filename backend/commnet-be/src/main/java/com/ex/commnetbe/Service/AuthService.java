package com.ex.commnetbe.Service;


import com.ex.commnetbe.Dto.LoginDto;
import com.ex.commnetbe.Dto.LoginResponseDto;
import com.ex.commnetbe.Dto.ResponseDto;
import com.ex.commnetbe.Dto.SignUpDto;
import com.ex.commnetbe.Entity.UserEntity;
import com.ex.commnetbe.Repository.UserRepository;
import com.ex.commnetbe.Security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    TokenProvider tokenProvider;
    @Autowired
    MainService mainService;

    public ResponseDto<?> signUp(SignUpDto dto) {
        String email = dto.getEmail();
        String password = dto.getPassword();
        String confirmPassword = dto.getConfirmPassword();

        // email(id) 중복 확인
        try {
            // 존재하는 경우 : true / 존재하지 않는 경우 : false
            if(userRepository.existsById(email)) {
                return ResponseDto.setFailed("중복된 Email 입니다.");
            }
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }

        // password 중복 확인
        if(!password.equals(confirmPassword)) {
            return ResponseDto.setFailed("비밀번호가 일치하지 않습니다.");
        }

        // UserEntity 생성
        UserEntity userEntity = new UserEntity(dto);

        // 비밀번호 암호화
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);

        boolean isPasswordMatch = passwordEncoder.matches(password, hashedPassword);

        if(!isPasswordMatch) {
            return ResponseDto.setFailed("암호화에 실패하였습니다.");
        }

        userEntity.setPassword(hashedPassword);

        // UserRepository를 이용하여 DB에 Entity 저장
        try {
            userRepository.save(userEntity);
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }

        return ResponseDto.setSuccess("회원 생성에 성공했습니다.");
    }

    public ResponseDto<LoginResponseDto> login(LoginDto dto) {
        String email = dto.getEmail();
        String password = dto.getPassword();
        UserEntity userEntity;

        try {
            // 이메일로 사용자 정보 가져오기
            userEntity = userRepository.findById(email).orElse(null);
            if(userEntity == null) {
                return ResponseDto.setFailed("입력하신 이메일로 등록된 계정이 존재하지 않습니다.");
            }

            // 사용자가 입력한 비밀번호를 BCryptPasswordEncoder를 사용하여 암호화
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = userEntity.getPassword();

            // 저장된 암호화된 비밀번호와 입력된 암호화된 비밀번호 비교
            if(!passwordEncoder.matches(password, encodedPassword)) {
                return ResponseDto.setFailed("비밀번호가 일치하지 않습니다.");
            }
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }

        // Client에 비밀번호 제공 방지
        userEntity.setPassword("");
        String name = userEntity.getName();

        String token = "";
        int exprTime = 3600; // 1h

        token = tokenProvider.createJwt(email, exprTime);

        if(token == null) {
            return ResponseDto.setFailed("토큰 생성에 실패하였습니다.");
        }

        LoginResponseDto loginResponseDto = new LoginResponseDto(token, exprTime, userEntity);

        return ResponseDto.setSuccessData("로그인에 성공하였습니다.", loginResponseDto);
    }

    public ResponseDto<?> extendSession(Map<String, String> request) {
        String token = request.get("token");

        // 토큰 유효성 검증
        if (tokenProvider.validateJwt(token)) {
            // 기존 토큰에서 이메일 추출 (JWT에서 이메일을 추출)
            String email = tokenProvider.getEmailFromToken(token); // JWT에서 이메일 추출
            if (email == null) {
                return ResponseDto.setFailed("토큰에서 이메일을 추출할 수 없습니다.");
            }

            // 새로운 토큰 생성 및 만료 시간 연장
            int exprTime = 3600; // 연장 할 시간
            String newToken = tokenProvider.createJwt(email, exprTime); // 새로운 JWT 발급
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("token", newToken);
            responseData.put("exprTime", exprTime); // 새로 연장된 만료 시간

            return ResponseDto.setSuccessData("세션이 연장되었습니다.", responseData);
        } else {
            return ResponseDto.setFailed("토큰이 유효하지 않습니다.");
        }
    }

    public ResponseDto<?> loginAuth(Map<String, String> request) {
        String token = request.get("token");
        UserEntity userEntity;
        try {
            if (token != null) {
                String email = tokenProvider.getEmailFromToken(token);
                if (email == null) {
                    return ResponseDto.setFailed("토큰에서 이메일을 추출할 수 없습니다.");
                }
                userEntity = userRepository.findById(email).orElse(null);
                if(userEntity == null) {
                    return ResponseDto.setFailed("등록된 계정이 존재하지 않습니다.");
                }

                Map<String, Object> responseData = new HashMap<>();
                responseData.put("name", userEntity.getName());
                return ResponseDto.setSuccessData("ok", responseData);
            } else {
                return ResponseDto.setFailed("로그인 후 이용 가능합니다.");
            }
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }

    }
}