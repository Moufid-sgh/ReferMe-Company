import { FixedSizeList as List } from "react-window";


  function MenuList(props) {
    const height = 35;
    const { options, children, maxHeight, getValue } = props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
        <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
        className="scrollbar"
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    )
  }
  
  export default MenuList