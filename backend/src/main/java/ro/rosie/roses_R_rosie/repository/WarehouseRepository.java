package ro.rosie.roses_R_rosie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.rosie.roses_R_rosie.entity.Warehouse;

import java.util.Optional;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    Optional<Warehouse> findByName(String name);
    Optional<Warehouse> findByAddress(String address);
    Optional<Warehouse> findByPhone(String phone);
    Optional<Warehouse> findByManager(String manager);
    Optional<Warehouse> findByNameContaining(String partialName);
}


