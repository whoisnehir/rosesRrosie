package ro.rosie.roses_R_rosie.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Table(name = "app_users")
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Include
    private Long id;

    @ToString.Include
    private String name;

    @ToString.Include
    private String phone;

    @ToString.Include
    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;

    @ToString.Include
    private String defaultAddress;

    @ToString.Include
    private String defaultPaymentMethod;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart cart;

}

