export const cardItemStyle = {
    width: { xs: "100%", sm: 498 },
    height: 76,
    borderRadius: "32px",
    padding: "16px",
    backgroundColor: "white",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
  };
  
  export const checkboxTaskStyle =(showCheck:boolean|null=true)=> {
  const sty =  { marginRight: "16px",visibility:!showCheck ?"hidden":"" }
  return sty
  }

  export const titleItemTaskStyle = {
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "150%",
    letterSpacing: "0.15px",
  };
  export const descriptionItemTaskStyle = {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "143%",
    letterSpacing: "0.17px",
    color: "rgba(0, 0, 0, 0.6)"
  };
  export const categoryTextTaskStyle = (color?:string|null)=>{
    const sty =  {
      borderRadius: "100px",
      border: "1px solid",
      borderColor: color || "gray",
      padding: "2px 10px",
      color: color || "gray",
      fontSize: "12px", }
  return sty
};

export const modalStyle = {
  /* position: 'absolute' as const,
  bottom: 0,
  right: 0, */
  width: 320,
  bgcolor: 'rgba(0, 0, 0, 0.08)',
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
  m: 2
};