package com.ssafy.wouldUmarryme.account.dto.reponse;


import com.ssafy.wouldUmarryme.account.domain.Account;
import lombok.Getter;



@Getter
public class AccountSimpleResponse {
    private Long id;
    private String email;
    private String name;

    public AccountSimpleResponse(Long id, String email, String name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    public static AccountSimpleResponse of(Account account) {
        return new AccountSimpleResponse(account.getId(), account.getUid(), account.getName());
    }
}
