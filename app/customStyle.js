const customStyle = {
    indicatorSeparator: (style) => ({
      display: "none",
    }), menuList: (base) => ({
      ...base,

      "::-webkit-scrollbar": {
        width: "6px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
        borderRadius: "15px"
      },
      "::-webkit-scrollbar-thumb": {
        background: "#AFB5C0",
        borderRadius: "15px"
      },
      scrollbarWidth: "thin",
      scrollbarColor: "#AFB5C0 #f7f4ed",
    }), input: (base) => ({
      ...base,
      'input:focus': {
        boxShadow: 'none',
      },
    }),
  }
  export default customStyle