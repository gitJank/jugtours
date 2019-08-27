package com.jank.jugtours;

import com.jank.jugtours.model.Group;
import com.jank.jugtours.model.GroupRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class GroupRepositoryIntegrationTest {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private GroupRepository groupRepository;

	@Test
	public void whenFindByName_thenReturnGroup() {
		// given
		Group testGroup = new Group("test");
		entityManager.persist(testGroup);
		entityManager.flush();

		// when
		Group found = groupRepository.findByName(testGroup.getName());

		// then
		assertThat(found.getName()).isEqualTo(testGroup.getName());
	}

}
