import React, { useEffect } from "react";

const LazyList = props => {
  const { data, changeData } = props;

  useEffect(() => {
    window.addEventListener("scroll", onHandleScroll);
    return () => {
      window.removeEventListener("scroll", onHandleScroll);
    };
  }, []);

  const onHandleScroll = () => {
    const maxScrollTop =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ) - window.innerHeight;
    const currentScrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );

    if (maxScrollTop - currentScrollTop < 20) {
      changeData();
    }
  };

  return (
    <div className="lazy-list">
      {data.map(item => (
        <div className="lazy-list-item" key={item.key}>
          <p>{item.key}</p>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default LazyList;
