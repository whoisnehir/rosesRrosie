package ro.rosie.roses_R_rosie.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.rosie.roses_R_rosie.dto.UserAuthInfoDTO;
import ro.rosie.roses_R_rosie.entity.User;
import ro.rosie.roses_R_rosie.exception.UserIsPresentException;
import ro.rosie.roses_R_rosie.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SignUpService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signUp(UserAuthInfoDTO userDto){


        Optional<User> user = userRepository.findByEmail(userDto.getEmail());

        if(user.isPresent()){
            throw new UserIsPresentException("User already exists");
        }

        String encodedPassword = passwordEncoder.encode(userDto.getPassword());

        User newUser = User.builder()
                        .email(userDto.getEmail())
                        .password(encodedPassword)
                        .name("new user")
                        .build();

        userRepository.save(newUser);

    }
}
