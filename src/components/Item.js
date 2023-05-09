const Item = (props) => {
  var text = props.text;
  var width = props.width;
  var height = props.height;

  var request = props.request;

  const loadUp = () => {
    request(text);
  };

  const style = {
    width: width,
    height: height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

  const outputText = () => {
    var text_split = text.split(" ");
    return (
      Number(text_split[0]) +
      " " +
      text_split[1] +
      " " +
      Number(text_split[2]) +
      " = " +
      calculate([text_split[0], text_split[2]], text_split[1])
    );
  };

  return (
    <button style={style} onClick={loadUp}>
      {outputText()}
    </button>
  );
};

export default Item;
