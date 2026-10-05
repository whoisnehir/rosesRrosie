package ro.rosie.roses_R_rosie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.rosie.roses_R_rosie.entity.User;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByName(String name);
    Optional<User> findByPhone(String phone);
    Optional<User> findByEmail(String email);
}


