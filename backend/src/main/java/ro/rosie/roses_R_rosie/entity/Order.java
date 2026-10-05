package ro.rosie.roses_R_rosie.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@ToString(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@SuperBuilder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Include
    private Long id;

    @ToString.Include
    private BigDecimal price;

    @ToString.Include
    private LocalDateTime date;

    @ManyToOne
    @ToString.Include
    @JoinColumn(name = "user_id")
    private User user;

    @ToString.Include
    private String address;

    @ToString.Include
    private String paymentMethodUsed;
}
