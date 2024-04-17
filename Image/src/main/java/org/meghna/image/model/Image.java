package org.meghna.image.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    private String filename;

    @Setter
    @Getter
    private String contentType;

    @Setter
    @Getter
    @Lob
    private byte[] data;

}

