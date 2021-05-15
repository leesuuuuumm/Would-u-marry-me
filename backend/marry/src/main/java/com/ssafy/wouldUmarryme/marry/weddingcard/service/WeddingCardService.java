package com.ssafy.wouldUmarryme.marry.weddingcard.service;

import com.ssafy.wouldUmarryme.marry.awsS3.domain.Spot;
import com.ssafy.wouldUmarryme.marry.awsS3.service.AwsS3Service;
import com.ssafy.wouldUmarryme.marry.story.domain.Storyboard;
import com.ssafy.wouldUmarryme.marry.story.repository.SpotRepository;
import com.ssafy.wouldUmarryme.marry.story.repository.StoryBoardRepository;
import com.ssafy.wouldUmarryme.marry.weddingcard.domain.WeddingCard;
import com.ssafy.wouldUmarryme.marry.weddingcard.domain.WeddingCardImage;
import com.ssafy.wouldUmarryme.marry.weddingcard.domain.WeddingCardMap;
import com.ssafy.wouldUmarryme.marry.weddingcard.dto.CreateWeddingCardRequest;
import com.ssafy.wouldUmarryme.marry.weddingcard.dto.InputWeddingCardRequest;
import com.ssafy.wouldUmarryme.marry.weddingcard.dto.RetrieveWeddingCardRequest;
import com.ssafy.wouldUmarryme.marry.weddingcard.repository.WeddingCardImageRepository;
import com.ssafy.wouldUmarryme.marry.weddingcard.repository.WeddingCardMapRepository;
import com.ssafy.wouldUmarryme.marry.weddingcard.repository.WeddingCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.wouldUmarryme.marry.common.utils.HttpUtils.makeResponse;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class WeddingCardService {

    private final WeddingCardRepository weddingCardRepository;
    private final StoryBoardRepository storyBoardRepository;
    private final SpotRepository spotRepository;
    private final WeddingCardImageRepository weddingCardImageRepository;
    private final AwsS3Service awsS3Service;
    private final WeddingCardMapRepository weddingCardMapRepository;

    public Object createCard(CreateWeddingCardRequest createWeddingCardRequest) {
        Optional<Storyboard> storyboard = storyBoardRepository.findById(createWeddingCardRequest.getStoryBoardId());
        Optional<Spot> spot = spotRepository.findById(createWeddingCardRequest.getSpotId());
        WeddingCard weddingCard = WeddingCard.builder()
                .spot(spot.get())
                .storyboard(storyboard.get())
                .build();
        WeddingCard save = weddingCardRepository.save(weddingCard);
        storyboard.get().updateWeddingCard(save);
        storyBoardRepository.save(storyboard.get());
        return makeResponse("200", save,  "success", HttpStatus.OK);
    }

    public Object inputCard(InputWeddingCardRequest inputWeddingCardRequest,MultipartFile image) throws IOException {
        Optional<WeddingCard> card = weddingCardRepository.findById(inputWeddingCardRequest.getCardId());

        if(!card.isPresent()){
           return makeResponse("404", null, "fail", HttpStatus.NOT_FOUND);
        }

        WeddingCard save = card.get();

        //이미지 저장하기
        String imgName = "";
        String imgUrl = "";
        WeddingCardImage weddingCardImage = null;

        if(image != null){
            imgName = awsS3Service.uploadProfileImage(image,"card");
            imgUrl = "https://" + awsS3Service.CLOUD_FRONT_DOMAIN_NAME + "/" + imgName;
            weddingCardImage = WeddingCardImage.builder()
                    .imgName(imgName)
                    .imgUrl(imgUrl)
                    .weddingCard(card.get())
                    .build();
            weddingCardImageRepository.save(weddingCardImage);
            save.setWeddingCardImage(weddingCardImage);
        }
        WeddingCard requestWeddingCard = inputWeddingCardRequest.toWeddingCard();
        WeddingCardMap builderWeddingCardMap = WeddingCardMap.builder()
                .placeName(inputWeddingCardRequest.getPlaceName())
                .x(inputWeddingCardRequest.getX())
                .y(inputWeddingCardRequest.getY())
                .weddingCard(card.get())
                .build();
        WeddingCardMap saveMap = weddingCardMapRepository.save(builderWeddingCardMap);
        save.updateValue(requestWeddingCard,weddingCardImage,saveMap);
        weddingCardRepository.save(save);
        return makeResponse("200", save, "success", HttpStatus.OK);
    }

    public Object retrieveCard(Long storyBoardId) {
        Optional<Storyboard> storyboard = storyBoardRepository.findById(storyBoardId);
        Optional<WeddingCard> retrieve = weddingCardRepository.findById(storyboard.get().getWeddingCard().getId());
        //System.out.println(storyboard.get().getWeddingCard().getId());

        return makeResponse("200",retrieve.get(), "success", HttpStatus.OK);
    }
}
