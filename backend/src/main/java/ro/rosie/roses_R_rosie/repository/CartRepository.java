package ro.rosie.roses_R_rosie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.rosie.roses_R_rosie.entity.Cart;

public interface CartRepository extends JpaRepository<Cart,Long> {

}
