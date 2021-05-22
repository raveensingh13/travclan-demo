import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import keyBy from 'lodash.keyby'
import dayjs from 'dayjs';
import HomeUI from './HomeUI';
import { ListData } from '../../pages/_app';

const HomeComponent = () => {
  const [rowData, setRowData] = useState([]);
  const [maxBid, setMaxBid] = useState(true);
  const [showBid, setShowBid] = useState(false)
  const [bidData, setBidData] = useState([]);
  const list = useContext(ListData);
  const router = useRouter();

  const getBids = (value) => value.map((element) => {
    const { bids } = element;
    let min = 0;
    let max = 0;
    bids.forEach((item, key) => {
      const { amount } = item;
      if (key >= 1) {
        if (amount > max) {
          max = amount;
        }
        if (amount < min) {
          min = amount;
        }
      } else {
        max = amount;
        min = amount;
      }
    });
    return {
      ...element,
      maxBid: max,
      minBid: min,
      bid: max,
    };
  });

  const handleChange = (value) => {
    let data = [];
    setMaxBid(value.target.checked);
    if (value.target.checked) {
      data = rowData.map((item) => ({
        ...item,
        bid: item.maxBid,
      }));
    } else {
      data = rowData.map((item) => ({
        ...item,
        bid: item.minBid,
      }));
    }

    setRowData([...data]);
  };


  const handleRowClick = (row) => {
    console.log(row);
    router.push({
      pathname: '/bids',
      query: { id: row.id },
    });
  };

  useEffect(() => {
    const { query: { id } } = router;
    if (router.pathname === '/bids' && !bidData?.length) {
      setBidData(keyBy(list, 'id')[id]?.bids);
      setShowBid(true);
    }

    if (router.pathname === '/' && !rowData.length && list.length) {
      setShowBid(false);
      setBidData([]);
      setRowData(getBids(list));
    }

    if (router.pathname === '/') {
      setShowBid(false);
    }
  });

  return (
    <HomeUI
      maxBid={maxBid}
      showBid={showBid}
      bidData={bidData}
      rowData={rowData}
      handleChange={handleChange}
      handleRowClick={handleRowClick}
    />
  );
};

export default HomeComponent;
