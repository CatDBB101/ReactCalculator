import Item from "./Item";
import { useState } from "react";

const HistoryList = (props) => {
  var marginX = props.marginX;
  var marginY = props.marginY;

  if (marginX == undefined) {
    marginX = "0px";
  }
  if (marginY == undefined) {
    marginY = "0px";
  }

  var width = props.width;
  var height = props.height;

  if (width == undefined) {
    width = "100px";
  }
  if (height == undefined) {
    height = "100px";
  }

  var fontSize = props.fontSize;
  if (fontSize == undefined) {
    fontSize = "30px";
  }

  const style = {
    backgroundColor: "lightgray",
    width: width,
    height: height,
    marginLeft: marginX,
    marginTop: marginY,
    marginRight: "0px",
    marginBottom: "0px",
    position: "absolute",
    fontSize: fontSize,
    border: "4px solid #000",
    boxSizing: "border-box",
    overflowX: "Hidden",
    overflowY: "auto",
  };

  const request = props.request;
  const [history, setHistory] = useState(props.historys);

  const sendRequest = (ret_his) => {
    console.log([ret_his]);
    request(ret_his);
  };

  const calculate = (number, symbol) => {
    let a = Number(number[0]);
    let b = Number(number[1]);
    if (symbol == "x") {
      return a * b;
    } else if (symbol == "^") {
      return a ** b;
    } else if (symbol == "root") {
      return Math.pow(a, 1 / b);
    } else if (symbol == "fact") {
      var fact = 1;
      for (var i = 1; i <= a; i++) {
        fact *= i;
      }
      return fact;
    } else if (symbol == "mod") {
      return a % b;
    } else {
      return eval(a + symbol + b);
    }
  };

  const createItem = () => {
    var components = [];

    history.forEach((history_element) => {
      var history_split = history_element.split(" ");
      components.push(
        <Item
          request={loadHistory}
          text={
            history_split[0] +
            " " +
            history_split[1] +
            " " +
            history_split[2]
          }
          width={width}
          height={"100px"}
        />
      );
    });

    return components;
  };

  const loadHistory = (ret_his) => {
    sendRequest(ret_his);
  };

  return <div style={style}>{createItem()}</div>;
};

export default HistoryList;
