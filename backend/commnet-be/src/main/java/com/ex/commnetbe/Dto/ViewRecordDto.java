package com.ex.commnetbe.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ViewRecordDto {
    private Long id;
    private int postId;
    private String email;
    private LocalDateTime timestamp;
}
