package org.beer30.mrpickles.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.beer30.mrpickles.domain.PostTestSamples.*;
import static org.beer30.mrpickles.domain.TagTestSamples.*;

import java.util.HashSet;
import java.util.Set;
import org.beer30.mrpickles.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TagTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tag.class);
        Tag tag1 = getTagSample1();
        Tag tag2 = new Tag();
        assertThat(tag1).isNotEqualTo(tag2);

        tag2.setId(tag1.getId());
        assertThat(tag1).isEqualTo(tag2);

        tag2 = getTagSample2();
        assertThat(tag1).isNotEqualTo(tag2);
    }

    @Test
    void entryTest() {
        Tag tag = getTagRandomSampleGenerator();
        Post postBack = getPostRandomSampleGenerator();

        tag.addEntry(postBack);
        assertThat(tag.getEntries()).containsOnly(postBack);
        assertThat(postBack.getTags()).containsOnly(tag);

        tag.removeEntry(postBack);
        assertThat(tag.getEntries()).doesNotContain(postBack);
        assertThat(postBack.getTags()).doesNotContain(tag);

        tag.entries(new HashSet<>(Set.of(postBack)));
        assertThat(tag.getEntries()).containsOnly(postBack);
        assertThat(postBack.getTags()).containsOnly(tag);

        tag.setEntries(new HashSet<>());
        assertThat(tag.getEntries()).doesNotContain(postBack);
        assertThat(postBack.getTags()).doesNotContain(tag);
    }
}
