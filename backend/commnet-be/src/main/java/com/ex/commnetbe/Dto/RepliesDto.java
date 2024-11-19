package com.ex.commnetbe.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RepliesDto {
    private int replyId;
    private int postId;
    private String author;
    private String content;
    private LocalDateTime createdAt;
}
