import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paragon } from '../type';
import $ from 'jquery';

interface IParagonListProps {
}

const ParagonList: React.FunctionComponent<IParagonListProps> = (props) => {
  const [data, setData] = useState<Paragon[]>([]);
  const [isLoaded, setIsLoaded] = useState(Boolean);

  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(`https://sodfestival.online/data3?_sort=id&_order=asc`)
        .then((res) => {
          setData(res.data);
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));
      setInterval(() => {
        axios
          .get(`https://sodfestival.online/data3?_sort=id&_order=asc`)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => console.log(err))
      }, 30000);
    }
  }, []);

  useEffect(() => {
    for (let i = 1; i < 34; i++) {
      $(`#line${i}`).html("");
    }
    data.forEach(function (value, i) {
      const n = (i % 33) + 1; 
      var inner = document.getElementById(`line${n}`)?.innerHTML;
      $(`#line${n}`).html(`${inner}&ensp;${value.kata}`);
    })
  }, [data]);

  return (
    <>
      <div className='scroll-list'>
        <div className='scroll-caption'>
          <h1>WHAT IS THE BEST VERSION OF YOU?</h1>
        </div>
        <div className="scroll">
          <div className='RightToLeft'>
            <p id='line1'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line2'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line3'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line4'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line5'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line6'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line7'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line8'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line9'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line10'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line11'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line12'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line13'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line14'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line15'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line16'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line17'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line18'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line19'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line20'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line21'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line22'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line23'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line24'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line25'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line26'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line27'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line28'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line29'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line30'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line31'></p>
          </div>
          <div className='LeftToRight'>
            <p id='line32'></p>
          </div>
          <div className='RightToLeft'>
            <p id='line33'></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParagonList;