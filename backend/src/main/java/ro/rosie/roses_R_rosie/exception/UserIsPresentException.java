package ro.rosie.roses_R_rosie.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "User already exists")
public class UserIsPresentException extends RuntimeException {
    public UserIsPresentException(String message) {
        super(message);
    }
}
