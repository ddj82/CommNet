package com.ex.commnetbe.Dto;


import com.ex.commnetbe.Entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    private String token;
    private int exprTime;
    private UserEntity user;
}