package ro.rosie.roses_R_rosie.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "stocks")
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Include
    private Long id;

    @ToString.Include
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "variant_id")
    @ToString.Include
    private Variant variant;

    @ManyToOne
    @ToString.Include
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;
}


