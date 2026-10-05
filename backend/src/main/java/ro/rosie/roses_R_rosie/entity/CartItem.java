package ro.rosie.roses_R_rosie.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "cart_item")
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Include
    private Long id;

    @ToString.Include
    @ManyToOne
    @JoinColumn(name = "variant_id")
    private Variant variant;

    @ToString.Include
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ToString.Include
    private int quantity;
}
