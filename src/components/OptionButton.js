const OptionButton = (props) => {
  var text = String(props.text);
  var type = String(props.type);

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: fontSize,
  };

  const request = props.request;

  const sendRequest = () => {
    if (type == "number" || type == "symbol") {
      request(type + " " + text);
    } else {
      request(text);
    }
  };

  return (
    <button style={style} onClick={sendRequest}>
      {text}
    </button>
  );
};

export default OptionButton;
