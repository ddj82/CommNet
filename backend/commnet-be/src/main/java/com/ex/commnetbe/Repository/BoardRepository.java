package com.ex.commnetbe.Repository;


import com.ex.commnetbe.Entity.BoardEntity;
import jakarta.transaction.Transactional;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, String> {

    //Date를 원하는 형식으로 바꿔 가져오는 findAll
    @Query(value = "SELECT post_id, title, content, author, DATE_FORMAT(created_at, '%Y-%m-%d') as createdAt, updated_at FROM board", nativeQuery = true)
    List<Object[]> findAllWithFormattedDate();

    //조회수 증가 쿼리
    @Transactional
    @Modifying
    @Query("UPDATE BoardEntity b SET b.viewCount = b.viewCount + 1 WHERE b.postId = :postId")
    void incrementViewCount(@Param("postId") String postId);

    //댓글수 증가 쿼리
    @Transactional
    @Modifying
    @Query("UPDATE BoardEntity b SET b.repliesCount = b.repliesCount + 1 WHERE b.postId = :postId")
    void incrementRepliesCount(@Param("postId") int postId);
    
    //댓글수 감소 쿼리

}
