package ro.rosie.roses_R_rosie.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserAuthInfoDTO {

    @NotBlank(message = "Introduce your email")
    private String email;
    @NotBlank(message = "Introduce your password")
    private String password;

}
