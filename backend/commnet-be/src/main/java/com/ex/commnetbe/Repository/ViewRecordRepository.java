package com.ex.commnetbe.Repository;

import com.ex.commnetbe.Entity.ViewRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ViewRecordRepository extends JpaRepository<ViewRecordEntity, Long> {
    boolean existsByPostIdAndEmailAndTimestampAfter(int postId, String email, LocalDateTime timestamp);
}
