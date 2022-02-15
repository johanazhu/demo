// import React, { useState, useEffect, useRef } from "react";

// const GBCRVirtualList = props => {
//   const { data } = props;

//   const bottomElement = useRef();
//   const [start, setStart] = useState(0);
//   const [visibleCount, setVisibleCount] = useState(null);
//   const [visibleData, setVisibleData] = useState([]);

//   useEffect(() => {
//     setVisibleData(data.slice(start, start + count));

//     document.addEventListener("scroll", scrollRenderHandler);
//     return () => {
//       document.removeEventListener("scroll", scrollRenderHandler);
//     };
//   }, []);

//   const scrollRenderHandler = () => {
//     const rect = bottomElement.current?.getBoundingClientRect();

//     const top = rect ? rect.top : 0;

//     const clientHeight =
//       document.documentElement.clientHeight || document.body.clientHeight;

//     if (top < clientHeight) {
//       setList(list.concat(compGroups[groupIdx]));
//       setVisibleData(data.slice(start, start + visibleCount));
//     }
//   };

//   return (
//     <div style={{ position: "relative", textAlign: "center" }}>
//       {list.map(item => {
//         return (
//           <div
//             className="li-card"
//             key={item.key}
//             style={{ top }}
//             ref={refVal}
//             id={id}
//           >
//             {item.key}
//             {/* &nbsp;{item.value} */}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default GBCRVirtualList;

import React, { useEffect, useState, useRef } from "react";

const GBCRVirtualList = props => {
  const { data } = props;

  const [start, setStart] = useState(0);
  const [visibleCount, setVisibleCount] = useState(null);
  const [visibleData, setVisibleData] = useState([]);
  const virtualRef = useRef(null);
  const virtualContentRef = useRef(null);
  const bottomRef = useRef(null);
  const topElement = useRef(null);

  useEffect(() => {
    const count = Math.ceil(virtualRef.current.clientHeight / 30);
    console.log("count", count);
    setVisibleCount(count);
    setVisibleData(data.slice(start, start + count));

    // document.addEventListener("scroll", onHandleScroll);
    // return () => {
    //   document.removeEventListener("scroll", onHandleScroll);
    // };
  }, []);

  const onHandleScroll = () => {
    const rectTop = topElement.current?.getBoundingClientRect();
    const rect = bottomRef.current?.getBoundingClientRect();

    // console.log("rect", rect);
    // console.log("rectTop", rectTop);

    const top = rect ? rect.top : 0;

    // const clientHeight =
    //   document.documentElement.clientHeight || document.body.clientHeight;

    const clientHeight = virtualRef.current.clientHeight;

    // console.log("rect", rect);
    // console.log("clientHeight", clientHeight);
    // 下拉
    if (top < clientHeight) {
      const scrollTop = virtualRef.current.scrollTop;
      const fixedScrollTop = scrollTop - (scrollTop % 30);
      //   console.log("scrollTop", scrollTop);
      //   console.log("1", start);
      //   console.log("2", start + visibleCount);
      virtualContentRef.current.style.webkitTransform = `translate3d(0, ${fixedScrollTop}px, 0)`;
      setStart(Math.floor(scrollTop / 30));
      setVisibleData(data.slice(start, start + visibleCount));
    }

    // 最底部大于长度，说明向上滑动
    if (rectTop?.top > 0) {
      const scrollTop = virtualRef.current.scrollTop;
      const fixedScrollTop = scrollTop - (scrollTop % 30);
      //   virtualContentRef.current.style.webkitTransform = `translate3d(0, ${fixedScrollTop}px, 0)`;
      if (start - visibleCount > 0) {
        virtualContentRef.current.style.webkitTransform = `translate3d(0, ${fixedScrollTop}px, 0)`;
        setStart(Math.floor(scrollTop / 30));
        setVisibleData(data.slice(start - visibleCount, start));
      } else {
        console.log("test");
        virtualContentRef.current.style.webkitTransform = `translate3d(0, 0, 0)`;
        setStart(Math.floor(scrollTop / 30));
        setVisibleData(data.slice(0, visibleCount));
        // setVisibleData(data.slice(0, start));
      }
    }
  };

  //   const onHandleScroll = () => {
  //     const scrollTop = virtualRef.current.scrollTop;
  //     const fixedScrollTop = scrollTop - (scrollTop % 30);
  //     virtualContentRef.current.style.webkitTransform = `translate3d(0, ${fixedScrollTop}px, 0)`;
  //     setStart(Math.floor(scrollTop / 30));
  //     setVisibleData(data.slice(start, start + visibleCount));
  //   };

  //   console.log("visibleData", visibleData);

  const getReference = (index, isLastIndex) => {
    if (index === 0) return topElement;
    if (isLastIndex) return bottomRef;
    return null;
  };

  //   const lastIndex = updatedList.length - 1;

  return (
    <div className="virtual-list" ref={virtualRef} onScroll={onHandleScroll}>
      <div
        className="virtual-list-phantom"
        style={{ height: data.length * 30 + "px" }}
      ></div>
      <div className="virtual-list-content" ref={virtualContentRef}>
        {visibleData.map((item, index) => {
          const refVal = getReference(index, index === visibleData.length - 1);
          return (
            <div className="virtual-list-item" key={item.key} ref={refVal}>
              {item.key}
              {item.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GBCRVirtualList;
