import React, { useState, useEffect, useRef } from "react";

const THRESHOLD = 15;
const IOVirtualList = props => {
  const { data, height } = props;

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(THRESHOLD);
  const [observer, setObserver] = useState(null);
  const bottomElement = useRef();
  const topElement = useRef();

  useEffect(() => {
    intiateScrollObserver();

    return () => {
      resetObservation();
    };
  }, [end]);

  const intiateScrollObserver = () => {
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

    setObserver(Observer);
  };

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      const dataLength = data.length;
      if (entry.isIntersecting && entry.target.id === "bottom") {
        const maxStartIndex = dataLength - 1 - THRESHOLD;
        const maxEndIndex = dataLength - 1;
        const newStart = end - 5 <= maxStartIndex ? end - 5 : maxStartIndex;
        const newEnd = end + 10 <= maxEndIndex ? end + 10 : maxEndIndex;
        setStart(newStart);
        setEnd(newEnd);
      }
      if (entry.isIntersecting && entry.target.id === "top") {
        const newEnd =
          end === THRESHOLD
            ? THRESHOLD
            : end - 10 > THRESHOLD
            ? end - 10
            : THRESHOLD;
        const newStart = start === 0 ? 0 : start - 10 > 0 ? start - 10 : 0;
        setStart(newStart);
        setEnd(newEnd);
      }
    });
  };

  const resetObservation = () => {
    observer && observer.unobserve(bottomElement.current);
    observer && observer.unobserve(topElement.current);
  };

  const getReference = (index, isLastIndex) => {
    if (index === 0) return topElement;
    if (isLastIndex) return bottomElement;
    return null;
  };

  const updatedList = data.slice(start, end);
  const lastIndex = updatedList.length - 1;
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      {updatedList.map((item, index) => {
        const top = height * (index + start) + "px";
        const refVal = getReference(index, index === lastIndex);
        const id = index === 0 ? "top" : index === lastIndex ? "bottom" : "";
        return (
          <div
            className="io-virtual-list-item"
            key={item.key}
            style={{ top }}
            ref={refVal}
            id={id}
          >
            {item.key}
            {/* &nbsp;{item.value} */}
          </div>
        );
      })}
    </div>
  );
};

export default IOVirtualList;
