package com.ex.commnetbe.Entity;


import com.ex.commnetbe.Dto.BoardDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="board")
public class BoardEntity {
    @Id
    private int postId;
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public BoardEntity(BoardDto dto) {
        this.postId = dto.getPostId();
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.author = dto.getAuthor();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
