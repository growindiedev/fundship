import { useEffect } from "react";
import { useRouter } from "next/router";

export default function CategoryComponent(props) {
  const router = useRouter();

  const onClickFilter = (val) => {
    if (!props.isHome) {
      if (props.filter !== val) {
        props.changeCategory(val);
      } else {
        props.changeCategory(-1);
        document.getElementsByClassName("categoryItem")[val].blur();
      }
    } else {
      router.push({
        pathname: "/discover",
        query: {
          selected: val,
        },
      });
    }
  };

  const setSelectedFocus = () => {
    props.filter !== -1 &&
      document.getElementsByClassName("categoryItem")[props.filter]?.focus();
  };

  useEffect(() => {
    setSelectedFocus();
  }, []);

  return (
    <div className="category">
      <div
        className="categoryItem"
        tabIndex="1"
        onClick={() => onClickFilter(0)}
      >
        {"Design & tech"}
      </div>
      <div
        className="categoryItem"
        tabIndex="1"
        onClick={() => onClickFilter(1)}
      >
        Film
      </div>
      <div
        className="categoryItem"
        tabIndex="1"
        onClick={() => onClickFilter(2)}
      >
        Arts
      </div>
      <div
        className="categoryItem"
        tabIndex="1"
        onClick={() => onClickFilter(3)}
      >
        Games
      </div>
      <div
        className="categoryItem"
        tabIndex="1"
        onClick={() => onClickFilter(4)}
      >
        {"Social Cause"}
      </div>
    </div>
  );
}
