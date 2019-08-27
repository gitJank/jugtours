package com.jank.jugtours.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_group")
public class Group {

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private String address;
    private String city;
    private String state;
    private String country;
    private String postalCode;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private User user;

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Event> events;

    public Group(String name, String address, String city, String state, String country) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.country = country;
    }
}