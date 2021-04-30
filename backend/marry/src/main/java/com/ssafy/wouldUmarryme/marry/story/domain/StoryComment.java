package com.ssafy.wouldUmarryme.marry.story.domain;


import com.ssafy.wouldUmarryme.marry.story.domain.Story;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "story_comments")
public class StoryComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "story_comment_id")
    private Long id;

    @Column(name = "story_comment_value")
    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="story_id")
    private Story story;

    //몇번째위치의 멘트인지
    @Column(name="story_comment_index")
    private int index;
}
