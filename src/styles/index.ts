export const mainTitleStyle = {
  fontWeight: 600,
  fontSize: '36px',
  lineHeight: '117%',
  letterSpacing: '0px',
  paddingLeft: '34px',
  marginBottom: '27px',
};

export const mainSubTitleStyle = {
  fontWeight: '500',
  fontSize: '20px',
  lineHeight: '160%',
  letterSpacing: '0.15px',
  marginBottom: '10px',
  marginLeft: '10px',
};

export const taskListContainerStyle = {
  gap: '10px',
  padding: '24px',
  borderRadius: '32px',
  backgroundColor: '#FFFFFF',
  marginBottom: '12px',
};

export const cardItemStyle = {
  width: '100%',
  height: 76,
  borderRadius: '32px',
  padding: '16px',
  backgroundColor: 'white',
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
};

export const checkboxTaskStyle = (showCheck: boolean | null = true) => {
  const sty = { visibility: !showCheck ? 'hidden' : '' };
  return sty;
};

export const titleItemTaskStyle = {
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '150%',
  letterSpacing: '0.15px',
};
export const descriptionItemTaskStyle = {
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '143%',
  letterSpacing: '0.17px',
  color: 'rgba(0, 0, 0, 0.6)',
};
export const categoryTextTaskStyle = (color?: string | null, completed?: boolean | null) => {
  const sty = {
    borderRadius: '100px',
    border: '1px solid',
    borderColor: color && !completed ? color : 'gray',
    padding: '2px 10px',
    color: color && !completed ? color : 'gray',
    fontSize: '12px',
  };
  return sty;
};

export const modalStyle = {
  position: 'sticky',
  top: '20%',
  left: '38%',
  maxWidth: '396px',
  bgcolor: '#FFFFFF',
  borderRadius: '32px',
  //boxShadow: 24,
  p: '24px',
};
export const textDots = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '100%',
};
