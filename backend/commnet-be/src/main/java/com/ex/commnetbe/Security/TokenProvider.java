package com.ex.commnetbe.Security;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.util.Date;

@Service
public class TokenProvider {
    private static final String SECURITY_KEY = "mySuperSecretKey1234567890123456";

    // JWT 생성 메서드
    public String createJwt(String email, int duration) {
        try {
            // 현재 시간 기준 1시간 뒤로 만료시간 설정
            Instant now = Instant.now(); // jwt의 발급 시간(issue time)
            Instant exprTime = now.plusSeconds(duration); //jwt의 만료 시간(expiration time)

            // JWT Claim 설정
            // *Claim 집합 << 내용 설정 (페이로드 설정)
            // subject << "sub", issuer << "iss", expiration time << "exp" ....
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(email) // jwt의 주체(Subject)
                    .issueTime(Date.from(now)) // jwt의 발급 시간(Issue Time)을 현재시간으로
                    .expirationTime(Date.from(exprTime)) // jwt의 발급 시간(Issue Time)을 현재시간으로
                    .build();

            // JWT 서명
            SignedJWT signedJWT = new SignedJWT(
                    new JWSHeader(JWSAlgorithm.HS256),	// *헤더 설정
                    claimsSet
            );

            // HMAC 서명을 사용하여 JWT 서명
            JWSSigner signer = new MACSigner(SECURITY_KEY.getBytes());	// *서명 설정
            signedJWT.sign(signer); // jwt가 서명상태로 완성됨

            return signedJWT.serialize(); // 최종적으로 서명된 JWT를 문자열로 직렬화하여 반환

        } catch (JOSEException e) {
            e.printStackTrace();
            return null;
        }
    }

    // JWT 검증 메서드
    public boolean validateJwt(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);

            // 토큰이 유효한지 확인 (서명 확인 및 만료 시간 확인)
            if (signedJWT.verify(new MACVerifier(SECURITY_KEY.getBytes()))) {
                JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
                // 토큰의 만료 시간 체크
                if (claims.getExpirationTime().after(new Date())) {
                    return true; // 유효한 토큰
                }
            }
        } catch (ParseException | JOSEException e) {
            e.printStackTrace(); // 오류 발생 시 false 반환
        }
        return false; // 유효하지 않은 토큰
    }

    public String getEmailFromToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            return signedJWT.getJWTClaimsSet().getSubject(); // 주체(subject)로 저장된 이메일 반환
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
