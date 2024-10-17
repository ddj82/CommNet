package com.ex.commnetbe.Repository;


import com.ex.commnetbe.Entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, String> {
    @Query(value =
            "SELECT post_id, title, content, author, DATE_FORMAT(created_at, '%Y-%m-%d') as createdAt, updated_at FROM board", nativeQuery = true)
    public List<Object[]> findAllWithFormattedDate();
}
