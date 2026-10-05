
package ro.rosie.roses_R_rosie.service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.rosie.roses_R_rosie.dto.UserProfileDTO;
import ro.rosie.roses_R_rosie.entity.User;
import ro.rosie.roses_R_rosie.exception.ResourceNotFoundException;
import ro.rosie.roses_R_rosie.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;

    private UserProfileDTO convertToDTO(User user){
        UserProfileDTO dto = new UserProfileDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setDefaultAddress(user.getDefaultAddress());
        dto.setDefaultPaymentMethod(user.getDefaultPaymentMethod());
        dto.setPhone(user.getPhone());
        return dto;
    }

    @Transactional
    public UserProfileDTO changeUserProfileInfo(UserProfileDTO userDto){

        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if(userDto.getName() != null && !userDto.getName().isBlank()){
            user.setName(userDto.getName());
        }

        if(userDto.getEmail() != null && !userDto.getEmail().isBlank()){
            user.setEmail(userDto.getEmail());
        }

        if(userDto.getDefaultAddress() != null && !userDto.getDefaultAddress().isBlank()){
            user.setDefaultAddress(userDto.getDefaultAddress());
        }

        if(userDto.getDefaultPaymentMethod() != null && !userDto.getDefaultPaymentMethod().isBlank()){
            user.setDefaultPaymentMethod(userDto.getDefaultPaymentMethod());
        }

        if(userDto.getPhone() != null && !userDto.getPhone().isBlank()){
            user.setPhone(userDto.getPhone());
        }

        return convertToDTO(userRepository.save(user));
    }

}
