package com.jank.jugtours;

import com.jank.jugtours.model.Event;
import com.jank.jugtours.model.Group;
import com.jank.jugtours.model.GroupRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;

@Component
class Initializer implements CommandLineRunner {

    private final GroupRepository repository;

    public Initializer(GroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {

        repository.save(new Group("Denver JUG", "Fake Road", "Tocqueville", "IL", "USA"));
        repository.save(new Group("Utah JUG", "Real Street", "Petersburg", "N/A", "RUS"));
        repository.save(new Group("Seattle JUG", "Square Circle", "Duisburg", "GA", "USA"));
        repository.save(new Group("Richmond JUG", "Broken Dreams Blvd.", "Lank Park", "MO", "USA"));


        Group djug = repository.findByName("Denver JUG");
        Event e = Event.builder().title("Full Stack Reactive")
                .description("Reactive with Spring Boot + React")
                .date(Instant.parse("2018-12-12T18:00:00.000Z"))
                .build();
        djug.setEvents(Collections.singleton(e));
        repository.save(djug);

        repository.findAll().forEach(System.out::println);
    }
}
