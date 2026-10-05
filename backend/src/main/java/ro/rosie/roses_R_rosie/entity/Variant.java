package ro.rosie.roses_R_rosie.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Table(name = "variant")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(onlyExplicitlyIncluded = true)
@SuperBuilder
public class Variant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Include
    private Long id;

    @ToString.Include
    private String color;

    @ToString.Include
    private BigDecimal price;

    @ToString.Include
    private BigDecimal size;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @ToString.Include
    private Product product;
}

