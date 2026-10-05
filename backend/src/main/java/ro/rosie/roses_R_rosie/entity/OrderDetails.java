package ro.rosie.roses_R_rosie.entity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_details")
@Getter
@Setter
@NoArgsConstructor
@ToString(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@SuperBuilder
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Include
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @ToString.Include
    private Order order;

    @ManyToOne
    @JoinColumn(name = "variant_id")
    @ToString.Include
    private Variant variant;

    @ToString.Include
    private int quantity;

    @ToString.Include
    private BigDecimal price;
}


