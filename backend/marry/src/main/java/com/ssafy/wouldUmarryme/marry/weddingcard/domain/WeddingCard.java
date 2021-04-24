package com.ssafy.wouldUmarryme.marry.weddingcard.domain;

import com.ssafy.wouldUmarryme.marry.story.domain.Storyboard;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "card")
public class WeddingCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private Long id;

    @Column(name = "card_template")
    private int template;

    @Column(name = "card_time")
    private String time;

    @Column(name="card_date")
    private String date;

    @Column(name="card_place")
    private String place;

    @OneToOne
    @JoinColumn(name = "storyboard_id")
    private Storyboard storyboard;

    @OneToOne(mappedBy = "weddingcard",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private WeddingCardImage weddingCardImage;

    @OneToMany(mappedBy = "weddingcard",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<WeddingCardComment> weddingCardComments = new ArrayList<>();


}