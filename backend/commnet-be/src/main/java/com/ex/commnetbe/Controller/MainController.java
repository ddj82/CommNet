package com.ex.commnetbe.Controller;


import com.ex.commnetbe.Dto.BoardDto;
import com.ex.commnetbe.Dto.ResponseDto;
import com.ex.commnetbe.Service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("boardIst")
    public ResponseDto<?> boardInsert(@RequestBody BoardDto requestBody) {
        return mainService.boardInsert(requestBody);
    }
}
