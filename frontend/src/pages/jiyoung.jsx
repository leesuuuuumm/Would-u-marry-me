import React from 'react';
import StepProgressBar from '../components/stepProgressBar/stepProgressBar';
import Intro from '../components/intro/intro';
import SignUp from '../components/signUp/signUp';
import SignIn from '../components/signIn/signIn';
import FindPassword from '../components/findPassword/findPassword';
import ChangePassword from '../components/changePassword/changePassword';
import EditMemberInfo from '../components/editMemberInfo/editMemberInfo';

const Jiyoung = () => {
  
  
  return (
    <div>
      지영페이지
      <i className="fas fa-air-freshener"></i>
      <StepProgressBar onClickHandler={() => {
        console.log('hi');
      }}/>
      <Intro />
      <SignUp />
      <SignIn />
      <FindPassword />
      <ChangePassword />
      <EditMemberInfo />
    </div>
  );
}

export default Jiyoung;