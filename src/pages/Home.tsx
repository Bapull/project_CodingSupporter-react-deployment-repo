import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IntroImage {
  id: number;
  thumbnail: string;
  videoSrc: string;
}

const images: IntroImage[] = [
  {
    id: 1,
    thumbnail: "./images/HomeInfo/InputCode&Feedback.png",
    videoSrc: "./video/HomeInfo/VideoEx.mp4",
  },
  {
    id: 2,
    thumbnail: "./images/HomeInfo/RecommendMento.png",
    videoSrc: "./video/HomeInfo/VideoEx.mp4",
  },
  {
    id: 3,
    thumbnail: "./images/HomeInfo/ShareIncorrectNote.png",
    videoSrc: "./video/HomeInfo/VideoEx.mp4",
  },
  {
    id: 4,
    thumbnail: "./images/HomeInfo/ShareNote&ChatMento.png",
    videoSrc: "./video/HomeInfo/VideoEx.mp4",
  },
  {
    id: 5,
    thumbnail: "./images/HomeInfo/ViewUser.png",
    videoSrc: "./video/HomeInfo/VideoEx.mp4",
  },
  {
    id: 6,
    thumbnail: "./images/HomeInfo/Folder.png",
    videoSrc: "./video/HomeInfo/VideoEx.mp4",
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const handleMouseEnter = (event: React.MouseEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    video.play();

    document.querySelector(".container")?.classList.add("dimmed");
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    video.pause();
    video.currentTime = 0;
    video.load();

    document.querySelector(".container")?.classList.remove("dimmed");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <h3 className="login-button" style={{ color: "black" }}>
          안녕하세요. {user?.name}님!
        </h3>
      ) : (
        <button className="login-button" onClick={handleLoginClick}>
          시작하기
        </button>
      )}
      <div className="home-content">
        <h1 className="home-content-title">
          Hi there,
          <br />
          I'm Coding Supporter!
          <br />
          AI와 멘토가 함께하는 새로운 학습 경험을 시작해보세요!
        </h1>
        <p className="home-content-text">
          우리의 목표는 초보자도 편하게 코딩을 배울 수 있는 환경을 제공하는
          것입니다 <br />
          AI와 멘토가 제공하는 도움을 통해, 직접 문제를 해결하며 성장할 수
          있습니다
          <br />
          즉각적인 피드백, 깊이 있는 조언을 통해 학습 방향을 잡아줍니다
          <br />
          Coding Supporter와 함께 경험을 쌓고, 문제 해결 능력을 키워보세요!
        </p>
        <div className="recommend-user">
          <p>코딩이 처음인 분들</p>
          <p>혼자 공부하기 막막한 초보 개발자</p>
          <p>
            멘토와의 연결을 통해
            <br />더 빠르게 성장하고 싶은 분들
          </p>
        </div>
      </div>
      <div className="intro-images">
        {images.map((image) => (
          <div key={image.id} className="intro-image">
            <video
              className="intro-video"
              poster={image.thumbnail}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              muted
              loop
            >
              <source src={image.videoSrc} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
