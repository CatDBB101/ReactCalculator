import OptionButton from "./OptionButton";
import Moniter from "./Moniter";
import HistoryList from "./HistoryList";
import { useState } from "react";

function App() {
  var [history, setHistory] = useState(["0 + 0"]);
  const [number, setNumber] = useState(["0", "0"]);
  var [mode, setMode] = useState(0);
  const [symbol, setSymbol] = useState("+");

  const switchMode = () => {
    if (mode == 0) {
      setMode(1);
    } else {
      setMode(0);
    }
  };

  const to_array = (text) => {
    var _array = [];
    for (var letter of text) {
      _array.push(letter);
    }
    return _array;
  };

  const calculate = () => {
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

  const add_dot = (number_text) => {
    if (number_text.includes(".")) {
      return number_text;
    } else {
      return (number_text += ".");
    }
  };

  const request = (req) => {
    // set + number
    // +/-/x/"/"/^/root/
    var command = req.split(" ");
    if (command[0] == "number") {
      if (mode == 0) {
        setNumber([number[0] + command[1], number[1]]);
      } else {
        setNumber([number[0], number[1] + command[1]]);
      }
    } else if (command[0] == "symbol") {
      setSymbol(command[1]);
      switchMode();
    } else {
      if (command[0] == "A") {
        setMode(0);
      } else if (command[0] == "B") {
        setMode(1);
      } else if (command[0] == "Cls") {
        setNumber([0, 0]);
        setSymbol("+");
        setMode(0);
      } else if (command[0] == "Del") {
        if (mode == 0) {
          var _number = number[0].split("");
          _number.pop();
          setNumber([_number.toString().replaceAll(",", ""), number[1]]);
        } else {
          var _number = number[1].split("");
          _number.pop();
          number[1] = _number.join();
        }
      } else if (command[0] == "Ent") {
        history.push(number[0] + " " + symbol + " " + number[1]);
        setNumber([calculate(), number[1]]);
        setSymbol("+");
        setMode(0);
      } else if (command[0] == ".") {
        if (mode == 0) {
          setNumber([add_dot(number[0]), number[1]]);
        } else {
          setNumber([number[0], add_dot(number[1])]);
        }
      } else {
        var a = command[0];
        var b = command[2];
        var s = command[1];

        console.log(a, b, s);

        setNumber([a, b]);
        setSymbol(s);
        setMode(0);
      }
    }
  };

  const createNumberPad = () => {
    var components = [];

    const number_text = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ];
    for (var line = 2; line < 5; line++) {
      for (var col = 1; col < 4; col++) {
        components.push(
          <OptionButton
            request={request}
            type="number"
            text={number_text[line - 2][col - 1]}
            marginX={col * 100 + "px"}
            marginY={line * 100 + "px"}
          />
        );
      }
    }

    return components;
  };

  const symbolPad = () => {
    var components = [];

    const number_text = [
      ["+", "^"],
      ["-", "root"],
      ["x", "mod"],
      ["/", "fact"],
    ];
    for (var line = 2; line < 6; line++) {
      for (var col = 4; col < 6; col++) {
        components.push(
          <OptionButton
            request={request}
            type="symbol"
            text={number_text[line - 2][col - 4]}
            marginX={col * 100 + "px"}
            marginY={line * 100 + "px"}
          />
        );
      }
    }

    return components;
  };

  const operatorPad = () => {
    var components = [];

    const number_text = [["A", "B", "Cls", "Del", "Ent"]];
    for (var line = 6; line < 7; line++) {
      for (var col = 1; col < 6; col++) {
        components.push(
          <OptionButton
            request={request}
            type="operate"
            text={number_text[line - 6][col - 1]}
            marginX={col * 100 + "px"}
            marginY={line * 100 + "px"}
          />
        );
      }
    }

    return components;
  };

  const moniterText = () => {
    return Number(number[0]) + " " + symbol + " " + Number(number[1]);
  };

  return (
    <div>
      <div>
        <Moniter text={moniterText()} width="500px" height="100px" />
        {createNumberPad()}
        <OptionButton
          request={request}
          text={"0"}
          type={"number"}
          width={"200px"}
          marginX={"100px"}
          marginY={"500px"}
        />
        <OptionButton
          request={request}
          text={"."}
          type={"operate"}
          width={"100px"}
          height={"100px"}
          marginX={"300px"}
          marginY={"500px"}
        />
        <HistoryList
          request={request}
          historys={history}
          width={"400px"}
          height={"600px"}
          marginX={"600px"}
          marginY={"100px"}
        />
        {symbolPad()}
        {operatorPad()}
      </div>
    </div>
  );
}

export default App;
