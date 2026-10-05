package ro.rosie.roses_R_rosie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.rosie.roses_R_rosie.entity.Order;
import ro.rosie.roses_R_rosie.entity.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    Optional<Order> findByDate(LocalDateTime date);
    List<Order> findByDateBetween(LocalDateTime start, LocalDateTime end);
    Optional<Order> findByUser(User user);
    List<Order> findByUserIdOrderByDateDesc(Long id);
}


