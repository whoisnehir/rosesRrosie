package ro.rosie.roses_R_rosie.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserProfileDTO {

    @NotNull(message = "Costumer ID is required")
    private Long id;

    //@NotBlank(message = "Name is required")
    private String name;

    //@NotBlank(message = "E-mail is required")
    private String email;

    //@NotBlank(message = "Address is required")
    private String defaultAddress;

    //@NotBlank(message = "Payment method is required")
    private String defaultPaymentMethod;

    //@NotBlank(message = "Phone number is required")
    private String phone;


}
