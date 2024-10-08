import { useLocation } from 'react-router-dom';

function HeadTitle() {
  const location = useLocation();

  return <h1>title</h1>;
}

export default HeadTitle;
