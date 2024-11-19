package com.ex.commnetbe.Controller;


import com.ex.commnetbe.Dto.BoardDto;
import com.ex.commnetbe.Dto.RepliesDto;
import com.ex.commnetbe.Dto.ResponseDto;
import com.ex.commnetbe.Service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/")
public class MainController {
    @Autowired
    MainService mainService;

    @GetMapping("check")
    public String check() {
        return "Success";
    }

    @PostMapping("board")
    public ResponseDto<?> board() {
        return mainService.BoardListAll();
    }

    @PostMapping("board/insert")
    public ResponseDto<?> boardInsert(@RequestBody BoardDto requestBody) {
        return mainService.boardInsert(requestBody);
    }

    @PostMapping("board/one")
    public ResponseDto<?> boardOne(@RequestBody BoardDto requestBody, @RequestHeader(value = "Authorization", required = false) String jwtToken) {
        return mainService.boardOne(requestBody, jwtToken);
    }

    @PostMapping("reply/insert")
    public ResponseDto<?> replyInsert(@ModelAttribute RepliesDto requestBody, @RequestParam(value = "replyImg", required = false) MultipartFile file) {
        return mainService.replyInsert(requestBody, file);
    }

    @PostMapping("reply/list")
    public ResponseDto<?> replyList(@RequestBody RepliesDto requestBody) {
        return mainService.replyList(requestBody);
    }
}
