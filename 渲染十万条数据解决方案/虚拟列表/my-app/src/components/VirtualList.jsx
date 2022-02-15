import React, { useEffect, useState, useRef } from "react";

const VirtualList = props => {
  const { data } = props;

  const [start, setStart] = useState(0);
  const [visibleCount, setVisibleCount] = useState(null);
  const [visibleData, setVisibleData] = useState([]);
  const virtualRef = useRef(null);
  const virtualContentRef = useRef(null);

  useEffect(() => {
    const count = Math.ceil(virtualRef.current.clientHeight / 30);
    setVisibleCount(count);
    setVisibleData(data.slice(start, start + count));
  }, []);

  const onHandleScroll = () => {
    const scrollTop = virtualRef.current.scrollTop;
    const fixedScrollTop = scrollTop - (scrollTop % 30);
    virtualContentRef.current.style.webkitTransform = `translate3d(0, ${fixedScrollTop}px, 0)`;
    setStart(Math.floor(scrollTop / 30));
    setVisibleData(data.slice(start, start + visibleCount));
  };

  return (
    <div className="virtual-list" ref={virtualRef} onScroll={onHandleScroll}>
      <div
        className="virtual-list-phantom"
        style={{ height: data.length * 30 + "px" }}
      ></div>
      <div className="virtual-list-content" ref={virtualContentRef}>
        {visibleData.map(item => (
          <div className="virtual-list-item" key={item.key}>
            {item.key}
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualList;
