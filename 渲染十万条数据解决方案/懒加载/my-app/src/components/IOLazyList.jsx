import React, { useEffect, useRef, useState } from "react";

const IOLazyList = props => {
  const { data, changeData } = props;

  console.log("data", data);

  const bottomElement = useRef();
  const topElement = useRef();
  const [end, setEnd] = useState(15);
  //   const [observer, setObserver] = useState(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const Observer = new IntersectionObserver(callback, options);

    if (topElement.current) {
      Observer.observe(topElement.current);
    }

    if (bottomElement.current) {
      Observer.observe(bottomElement.current);
    }
  }, [end]);

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      console.log("entry", entry);
      if (entry.isIntersecting && entry.target.id === "bottom") {
        changeData(true);
        setEnd(end + 10);
      }
      if (entry.isIntersecting && entry.target.id === "top") {
        changeData(false);
      }
    });
  };

  const getReference = (index, isLastIndex) => {
    if (index === 0) return topElement;
    if (isLastIndex) return bottomElement;
    return null;
  };

  const lastIndex = data.length - 1;
  return (
    <div className="lazy-list">
      {data.map((item, index) => {
        const refVal = getReference(index, index === lastIndex);
        const id = index === 0 ? "top" : index === lastIndex ? "bottom" : "";
        return (
          <div className="lazy-list-item" key={item.key} ref={refVal} id={id}>
            <p>{item.key}</p>
            <p>{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default IOLazyList;
