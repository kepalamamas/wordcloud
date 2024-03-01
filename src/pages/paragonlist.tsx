import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paragon } from '../type';

interface IParagonListProps {
}

const ParagonList: React.FunctionComponent<IParagonListProps> = (props) => {
  const [data, setData] = useState<Paragon[]>([]);
  const [isLoaded, setIsLoaded] = useState(Boolean);
  const [curRow, setCurRow] = useState(1);
  const [curCol, setCurCol] = useState(1)

  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(`https://sodfestival.online/data1?_sort=id&_order=asc`)
        .then((res) => {
          setData(res.data);
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));
      setInterval(() => {
        axios
          .get(`https://sodfestival.online/data1?_sort=id&_order=asc`)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => console.log(err))
      }, 20000);
    }
  }, []);

  return (
    <>
      <div className='scroll-list'>
        <div className='scroll-caption'>
          <h1>WHAT IS THE BEST VERSION OF YOU?</h1>
        </div>
        <div className="scroll">
          {data.map((dat) => {
            return (
              <div 
              className={dat.id.valueOf() % 2 == 0 ? "RightToLeft": "LeftToRight"} 
              style={{marginLeft: `-${5*(dat.id.valueOf() % 100)}px`}}>
                <p>{dat.kata}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default ParagonList;