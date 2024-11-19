package com.ex.commnetbe.Entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "view_record")
public class ViewRecordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 생성 설정
    private Long id;

    private int postId;
    private String email;
    private LocalDateTime timestamp;

    public ViewRecordEntity() {}

    public ViewRecordEntity(int postId, String email, LocalDateTime timestamp) {
        this.postId = postId;
        this.email = email;
        this.timestamp = timestamp;
    }
}
