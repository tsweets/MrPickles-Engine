package org.beer30.mrpickles.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A Tag.
 */
@Table("tag")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "tag")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Tag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @NotNull(message = "must not be null")
    @Size(min = 2)
    @Column("name")
    @org.springframework.data.elasticsearch.annotations.Field(type = org.springframework.data.elasticsearch.annotations.FieldType.Text)
    private String name;

    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "blog", "tags" }, allowSetters = true)
    private Set<Post> entries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Tag id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Tag name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Post> getEntries() {
        return this.entries;
    }

    public void setEntries(Set<Post> posts) {
        if (this.entries != null) {
            this.entries.forEach(i -> i.removeTag(this));
        }
        if (posts != null) {
            posts.forEach(i -> i.addTag(this));
        }
        this.entries = posts;
    }

    public Tag entries(Set<Post> posts) {
        this.setEntries(posts);
        return this;
    }

    public Tag addEntry(Post post) {
        this.entries.add(post);
        post.getTags().add(this);
        return this;
    }

    public Tag removeEntry(Post post) {
        this.entries.remove(post);
        post.getTags().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tag)) {
            return false;
        }
        return getId() != null && getId().equals(((Tag) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tag{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
