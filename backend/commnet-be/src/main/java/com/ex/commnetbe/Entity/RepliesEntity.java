package com.ex.commnetbe.Entity;

import com.ex.commnetbe.Dto.RepliesDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "replies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RepliesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int replyId;
    private int postId;
    private String author;
    private String content;
    private LocalDateTime createdAt;
    private String replyImg;

    public RepliesEntity(RepliesDto dto) {
        this.replyId = dto.getReplyId();
        this.postId = dto.getPostId();
        this.author = dto.getAuthor();
        this.content = dto.getContent();
        this.createdAt = LocalDateTime.now();
    }
}
