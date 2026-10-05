package ro.rosie.roses_R_rosie.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Entity
@Table(name = "product")
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Include
    private Long id;

    @ToString.Include
    private String name;

    @ToString.Include
    private String description;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    @ToString.Include
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "type_id")
    @ToString.Include
    private ProductType type;

    @OneToMany(mappedBy = "product",  cascade = CascadeType.ALL)
    private List<Variant> variants;

}


