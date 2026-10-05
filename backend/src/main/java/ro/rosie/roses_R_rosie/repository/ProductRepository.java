package ro.rosie.roses_R_rosie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.rosie.roses_R_rosie.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByName(String productName);
    List<Product> findByTypeId(Long typeId);
}


