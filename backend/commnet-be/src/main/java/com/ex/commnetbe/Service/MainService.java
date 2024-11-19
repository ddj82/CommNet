package com.ex.commnetbe.Service;


import com.ex.commnetbe.Dto.BoardDto;
import com.ex.commnetbe.Dto.RepliesDto;
import com.ex.commnetbe.Dto.ResponseDto;
import com.ex.commnetbe.Entity.BoardEntity;
import com.ex.commnetbe.Entity.RepliesEntity;
import com.ex.commnetbe.Entity.ViewRecordEntity;
import com.ex.commnetbe.Repository.BoardRepository;
import com.ex.commnetbe.Repository.RepliesRepository;
import com.ex.commnetbe.Repository.UserRepository;
import com.ex.commnetbe.Repository.ViewRecordRepository;
import com.ex.commnetbe.Security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {
    private final BoardRepository boardRepository;

    private final UserRepository userRepository;

    private final TokenProvider tokenProvider;

    private final ViewRecordRepository viewRecordRepository;
    private final RepliesRepository repliesRepository;

    public ResponseDto<?> BoardListAll() {
        try {
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

    public ResponseDto<?> boardOne(BoardDto dto, String jwtToken) {
        String postId = String.valueOf(dto.getPostId());
        BoardEntity boardEntity;
        try {
            String email = null;
            if (jwtToken == null) {
                // JWT토큰이 없을때 (비로그인상태)
                // 토큰이 없으면 비로그인 사용자 처리 (email을 "anonymous"로 설정 등)
                email = "anonymous";
            } else {
                // JWT토큰이 있을때 (로그인상태)
                jwtToken = jwtToken.substring(7); // "Bearer " 제거
                email = tokenProvider.getEmailFromToken(jwtToken); // 토큰에서 이메일 추출
            }

            if ((!isDuplicateView(dto.getPostId(), email))) {
                // 조회수 증가 처리
                boardRepository.incrementViewCount(postId);
                // 조회 기록 저장
                saveViewRecord(Integer.parseInt(postId), email);
            }

            // 게시물 정보 조회
            boardEntity = boardRepository.findById(postId).orElse(null);
            return ResponseDto.setSuccessData("글 조회에 성공했습니다.", boardEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }
    }

    // 중복 조회 여부 확인
    private boolean isDuplicateView(int postId, String email) {
        LocalDateTime startOfToday = LocalDateTime.now().toLocalDate().atStartOfDay();
        return viewRecordRepository.existsByPostIdAndEmailAndTimestampAfter(postId, email, startOfToday);
    }

    // 조회 기록 저장
    private void saveViewRecord(int postId, String email) {
        if (email == null) {
            email = "anonymous"; // 비로그인 사용자를 위한 기본 email 값 설정
        }
        ViewRecordEntity viewRecordEntity = new ViewRecordEntity(postId, email, LocalDateTime.now());
        viewRecordRepository.save(viewRecordEntity);
    }

    public ResponseDto<?> replyInsert(RepliesDto dto, MultipartFile file) {
        RepliesEntity repliesEntity = new RepliesEntity(dto);
        String imageUrl = null;
        try {
            // 파일이 존재할 때만 처리
            if (file != null && !file.isEmpty()) {

                // 파일 저장 경로 설정
                String folderPath = "C:/swork/usr/uploads/";
                Path folder = Paths.get(folderPath);
                if (!Files.exists(folder)) {
                    Files.createDirectories(folder); // 폴더가 없으면 생성
                }

                // 파일 저장
                String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path filePath = folder.resolve(filename);
                Files.copy(file.getInputStream(), filePath);

                // 이미지 URL 생성 (로컬 개발 환경 기준)
                imageUrl = "/uploads/" + filename;
            }
        } catch (Exception e) {
            return ResponseDto.setFailed("파일 저장 중 오류가 발생했습니다.");
        }

        // 이미지 URL 설정
        repliesEntity.setReplyImg(imageUrl); // 이미지 URL 설정
        repliesEntity.setCreatedAt(LocalDateTime.now()); // 생성 시간 설정
        try {
            repliesRepository.save(repliesEntity); // 엔티티 저장
            // repliesCount 증가 쿼리 호출
            boardRepository.incrementRepliesCount(dto.getPostId());
            return ResponseDto.setSuccess("댓글 등록에 성공했습니다.");
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }
    }

    public ResponseDto<?> replyList(RepliesDto requestBody) {
        int postId = Integer.parseInt(String.valueOf(requestBody.getPostId()));
        try {
            List<RepliesEntity> replyList = repliesRepository.findByPostId(postId);
            return ResponseDto.setSuccessData("댓글 조회에 성공했습니다.", replyList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("댓글 조회에 실패하였습니다.");
        }
    }
}
