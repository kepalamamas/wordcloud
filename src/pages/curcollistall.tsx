import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paragon } from '../type';
import { useRouter } from 'next/router';

interface IParagonListProps {
}

const ParagonList: React.FunctionComponent<IParagonListProps> = (props) => {
  const [data1, setData1] = useState<Paragon[]>([]);
  // const [data2, setData2] = useState<Paragon[]>([]);
  // const [data3, setData3] = useState<Paragon[]>([]);
  const [isLoaded, setIsLoaded] = useState(Boolean);
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(`https://konseruntuk.online/api/data1?_sort=id&_order=desc`)
        .then((res) => {
          setData1(res.data);
        })
        .catch((err) => console.log(err));
      // axios
      //   .get(`https://konseruntuk.online/api/data2?_sort=id&_order=desc`)
      //   .then((res) => {
      //     setData2(res.data);
      //   })
      //   .catch((err) => console.log(err));
      // axios
      //   .get(`https://konseruntuk.online/api/data3?_sort=id&_order=desc`)
      //   .then((res) => {
      //     setData3(res.data);
      //   })
      //   .catch((err) => console.log(err));
      setIsLoaded(true);
      setInterval(() => {
        axios
          .get(`https://konseruntuk.online/api/data1?_sort=id&_order=desc`)
          .then((res) => {
            setData1(res.data);
          })
          .catch((err) => console.log(err));
        // axios
        //   .get(`https://konseruntuk.online/api/data2?_sort=id&_order=desc`)
        //   .then((res) => {
        //     setData2(res.data);
        //   })
        //   .catch((err) => console.log(err));
        // axios
        //   .get(`https://konseruntuk.online/api/data3?_sort=id&_order=desc`)
        //   .then((res) => {
        //     setData3(res.data);
        //   })
        //   .catch((err) => console.log(err));
      }, 10000);
    }
  }, []);

  const handleDeleteAll = () => {
    const deleteKataAll = window.confirm("Are you sure want to delete all?")

    if (deleteKataAll) {
      data1.forEach((data) => {
        axios
          .delete(`https://konseruntuk.online/api/data1/${data.id}`)
          .catch((err) => console.log(err))
      });
      alert("berhasil delete data")
      router.push("/curcollistall")
    }
  }

  const handleDelete = (id: any) => {
    const deleteKataAll = window.confirm("Are you sure want to delete?")

    if (deleteKataAll) {
      axios
        .delete(`https://konseruntuk.online/api/data1/${id}`)
        .then(() => {
          alert("berhasil delete data")
          router.push("/curcollistall");
        })
        .catch((err) => console.log(err))
    };
  }

  return (
    <>
      <div className='container'>
        <h1>All List</h1>
        <button onClick={() => handleDeleteAll()}>Delete All</button>
        <div className='row'>
          <div className="list-holder">
            <h2>Data 1</h2>
            {data1.map((data) => {
              return (
                <div className='data-item' key={String(data.id)}>
                  {data.kata}
                  <button style={{ float: "right" }} onClick={() => handleDelete(data.id)}>Delete</button>
                  <button style={{ float: "right" }} onClick={() => {
                    router.push({
                      pathname: "/curcoldetail",
                      query: { id: String(data.id) }
                    })
                  }}>Detail</button>
                </div>
              )
            })}
          </div>
          {/* <div className="list-holder">
            <h2>Data 2</h2>
            {data2.map((data) => {
              return (
                <div className='data-item' key={String(data.id)} onClick={() => {
                  router.push({
                    pathname: "/paragondetail2",
                    query: { id: String(data.id) }
                  })
                }}>{data.kata}</div>
              )
            })}
          </div> */}
          {/* <div className="list-holder">
            <h2>Data 3</h2>
            {data3.map((data) => {
              return (
                <div className='data-item' key={String(data.id)} onClick={() => {
                  router.push({
                    pathname: "/paragondetail3",
                    query: { id: String(data.id) }
                  })
                }}>{data.kata}</div>
              )
            })}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ParagonList;