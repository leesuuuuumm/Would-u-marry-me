package com.ssafy.wouldUmarryme.marry.story.dto.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateStoryboardTitleRequest {
    private Long storyboardId;
    private String title;
}
