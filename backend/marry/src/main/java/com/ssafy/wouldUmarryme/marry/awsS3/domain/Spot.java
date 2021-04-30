package com.ssafy.wouldUmarryme.marry.awsS3.domain;

import com.ssafy.wouldUmarryme.marry.story.domain.Story;
import com.ssafy.wouldUmarryme.marry.weddingcard.domain.WeddingCard;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "spot")
public class Spot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "spot_id")
    private Long id;

    @Column(name = "spot_img_name")
    private String spotName;

    @Column(name = "spot_img_Url")
    private String imgUrl;

    @OneToOne(mappedBy = "spot", fetch = FetchType.LAZY)
    private Story story;

    @OneToOne(mappedBy = "spot", fetch = FetchType.LAZY)
    private WeddingCard weddingcard;

}
