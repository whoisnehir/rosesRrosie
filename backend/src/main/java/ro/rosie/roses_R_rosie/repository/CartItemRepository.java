package ro.rosie.roses_R_rosie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.rosie.roses_R_rosie.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {

}
