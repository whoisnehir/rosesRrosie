package ro.rosie.roses_R_rosie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.rosie.roses_R_rosie.entity.Variant;

import java.util.Optional;

public interface VariantRepository extends JpaRepository<Variant,Long> {
    Optional<Variant> findByColor(String color);

}


