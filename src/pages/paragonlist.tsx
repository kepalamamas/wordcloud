import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paragon } from '../type';
import $ from 'jquery';
import move from './components/mover/RandomObjectMover';

interface IParagonListProps {
}

const ParagonList: React.FunctionComponent<IParagonListProps> = (props) => {
  const [data, setData] = useState<Paragon[]>([]);
  const [isLoaded, setIsLoaded] = useState(Boolean);

  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(`http://localhost:3001/data1?_sort=id&_order=asc`)
        .then((res) => {
          setData(res.data);
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));
      setInterval(() => {
        axios
          .get(`http://localhost:3001/data1?_sort=id&_order=asc`)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => console.log(err))
      }, 5000);
    }
  }, []);

  useEffect(() => {
    // for (let i = 1; i < 34; i++) {
    //   $(`#line${i}`).html("");
    // }
    data.forEach(function (value, i) {
      move(`kata${i}`);
    })
  }, [data]);

  return (
    <>
      <script type="text/javascript" src="src/pages/components/mover/RandomObjectMover.js"></script>
      <div className='scroll-list'>
        <div className='scroll-caption'>
          <h1>WHAT IS THE BEST VERSION OF YOU?</h1>
        </div>
        <div className="scroll">
          {data.map((x, idx) => (
            <div>
              <p id={`kata${idx}`}>{x.kata}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ParagonList;