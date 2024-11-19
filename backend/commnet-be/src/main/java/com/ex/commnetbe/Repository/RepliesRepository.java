package com.ex.commnetbe.Repository;

import com.ex.commnetbe.Entity.RepliesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepliesRepository extends JpaRepository<RepliesEntity, String>{
    // postId로 댓글 리스트를 조회하는 메서드
    List<RepliesEntity> findByPostId(int postId);
}
