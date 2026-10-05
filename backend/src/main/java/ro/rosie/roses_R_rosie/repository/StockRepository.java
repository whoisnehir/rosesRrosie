package ro.rosie.roses_R_rosie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.rosie.roses_R_rosie.entity.Stock;

import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock,Long> {

    Optional<Stock> findByVariantIdAndWarehouseId(Long variantId, Long warehouseId);
}

