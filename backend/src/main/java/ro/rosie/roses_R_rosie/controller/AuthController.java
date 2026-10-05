package ro.rosie.roses_R_rosie.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.rosie.roses_R_rosie.dto.UserAuthInfoDTO;
import ro.rosie.roses_R_rosie.entity.User;
import ro.rosie.roses_R_rosie.service.SignUpService;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final SignUpService signUpService;

    @PostMapping("/signup")
    public ResponseEntity<String> register(@Valid @RequestBody UserAuthInfoDTO dto) {
        signUpService.signUp(dto);
        return ResponseEntity.ok("User registered successfully!");
    }
}
