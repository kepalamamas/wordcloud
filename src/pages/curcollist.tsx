import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paragon } from '../type';
import move from './components/mover/RandomObjectMover';

interface IParagonListProps {
}

const ParagonList: React.FunctionComponent<IParagonListProps> = (props) => {
  const [data, setData] = useState<Paragon[]>([]);
  const [data2, setData2] = useState<Paragon[]>([]);
  const [isLoaded, setIsLoaded] = useState(Boolean);

  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(`https://konseruntuk.online/api/data1?_sort=id&_order=desc&_limit=12`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
      axios
        .get(`https://konseruntuk.online/api/data2?_sort=id&_order=desc&_limit=12`)
        .then((res) => setData2(res.data))
        .catch((err) => console.log(err));
      setIsLoaded(true);
      setInterval(() => {
        axios
          .get(`https://konseruntuk.online/api/data1?_sort=id&_order=desc&_limit=12`)
          .then((res) => setData(res.data))
          .catch((err) => console.log(err));
        axios
          .get(`https://konseruntuk.online/api/data2?_sort=id&_order=desc&_limit=12`)
          .then((res) => setData2(res.data))
          .catch((err) => console.log(err));
      }, 5000);
    }
  }, []);

  useEffect(() => {
    data.forEach(function (value, i) {
      // move(`kata${i}`);
    })
  }, [data]);

  return (
    <>
      <script type="text/javascript" src="src/pages/components/mover/RandomObjectMover.js"></script>
      <div className='scroll-list'>
        <div className='scroll-container'>
          <div className="scroll" id='scroll'>
            {data.map((x, idx) => (
              <div className='container-kata'>
                <p className='kata' id={`kata${idx}`}>{x.kata}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='scroll-container'>
          <div className="scroll" id='scroll'>
            {data2.map((x, idx) => (
              <div className='container-kata'>
                <p className='kata' id={`kata2${idx}`}>{x.kata}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParagonList;