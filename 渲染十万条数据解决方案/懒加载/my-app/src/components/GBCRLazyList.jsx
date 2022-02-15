import React, { useEffect, useRef } from "react";

const GBCRLazyList = props => {
  const { data, changeData } = props;

  const bottomElement = useRef();
  const topElement = useRef();

  useEffect(() => {
    window.addEventListener("scroll", onHandleScroll);
    return () => {
      window.removeEventListener("scroll", onHandleScroll);
    };
  }, []);

  const onHandleScroll = () => {
    let seeHeight = document.documentElement.clientHeight;
    if (bottomElement.current.getBoundingClientRect().top < seeHeight) {
      changeData();
    }
  };

  const getReference = (index, isLastIndex) => {
    if (index === 0) return topElement;
    if (isLastIndex) return bottomElement;
    return null;
  };

  return (
    <div className="lazy-list">
      {data.map((item, index) => {
        const refVal = getReference(index, index === data.length - 1);
        return (
          <div className="lazy-list-item" key={item.key} ref={refVal}>
            <p>{item.key}</p>
            <p>{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default GBCRLazyList;
