const Moniter = (props) => {
  var text = props.text;

  var width = props.width;
  var height = props.height;
  if (width == undefined) {
    width = "300px";
  }
  if (height == undefined) {
    height = "100px";
  }

  var marginX = props.marginX;
  var marginY = props.marginY;
  if (marginX == undefined) {
    marginX = "100px";
  }
  if (marginY == undefined) {
    marginY = "100px";
  }

  const style = {
    width: width,
    height: height,
    marginTop: marginY,
    marginLeft: marginX,
    marginRight: "0px",
    marginBottom: "0px",
    borderColor: "#000",
    backgroundColor: "lightgray",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    position: "absolute",
    border: "4px solid #000",
    boxSizing: "border-box",
  };
  return <div style={style}>{text}</div>;
};

export default Moniter;
