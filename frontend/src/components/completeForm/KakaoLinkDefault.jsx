import React from "react";

function KakaoLinkDefault({ children, template, jsKey, className }) {
  React.useEffect(() => {
    let id = "kakao-link-api";
    if (document.getElementById(id) == null) {
      const js = document.createElement("script");

      js.id = id;
      js.src = "//developers.kakao.com/sdk/js/kakao.min.js";
      js.onload = () => {
        window.Kakao.init(jsKey);
      };

      document.body.append(js);
    }
  }, []);

  const onLink = () => {
    window.Kakao.Link.sendDefault(template);
  };

  return (
    <div className={className} onClick={onLink}>
      {children}
    </div>
  );
}

export default KakaoLinkDefault;
