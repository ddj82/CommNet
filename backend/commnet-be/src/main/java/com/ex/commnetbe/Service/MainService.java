package com.ex.commnetbe.Service;


import com.ex.commnetbe.Dto.BoardDto;
import com.ex.commnetbe.Dto.ResponseDto;
import com.ex.commnetbe.Entity.BoardEntity;
import com.ex.commnetbe.Repository.BoardRepository;
import com.ex.commnetbe.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainService {
    @Autowired
    BoardRepository boardRepository;
    @Autowired
    UserRepository userRepository;

    public ResponseDto<?> BoardListAll() {
        try {
//            List<Object[]> boardList = boardRepository.findAllWithFormattedDate();
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//            // DTO 변환 작업
//            List<BoardDto> boardDtoList = boardList.stream().map(row -> {
//                BoardDto dto = new BoardDto();
//                dto.setPostId((Integer) row[0]); // postId (AUTO_INCREMENT)
//                dto.setTitle((String) row[1]); // title
//                dto.setContent((String) row[2]); // content
//                dto.setAuthor((String) row[3]); // author
//                dto.setCreatedAt((LocalDateTime) row[4]);
//                dto.setUpdatedAt((LocalDateTime) row[5]);
//
//                return dto;
//            }).collect(Collectors.toList());
//            return ResponseDto.setSuccessData("글 조회에 성공했습니다.", boardDtoList);
            List<BoardEntity> boardList = boardRepository.findAll();
            return ResponseDto.setSuccessData("글 조회에 성공했습니다.", boardList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("글 조회에 실패하였습니다.");
        }
    }

    public ResponseDto<?> boardInsert(BoardDto dto) {
        BoardEntity boardEntity = new BoardEntity(dto);
        try {
            boardRepository.save(boardEntity);
            return ResponseDto.setSuccess("글 등록에 성공했습니다.");
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }
    }

    public ResponseDto<?> boardOne(BoardDto dto) {
        String postId = String.valueOf(dto.getPostId());
        BoardEntity boardEntity;
        try {
            boardEntity = boardRepository.findById(postId).orElse(null);
            return ResponseDto.setSuccessData("글 조회에 성공했습니다.", boardEntity);
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }
    }
}
