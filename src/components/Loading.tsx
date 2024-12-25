import './styles/loading.css';

const Loading: React.FC = () => {
    return (
        <div className="loading">
            <div className='spinner-container'>
                <div className="fallback-spinner"></div>
            </div>
            <h3 className="loading-text">
                오답노트를 생성 중입니다<br />
                잠시만 기다려주세요!
            </h3>
        </div>
    );
}

export default Loading;