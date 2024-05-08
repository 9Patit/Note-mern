export const validateEmail = (email) => {
  // Regex นี้ใช้ในการตรวจสอบว่าข้อความที่รับเข้ามามีรูปแบบที่คล้ายกับอีเมลที่ถูกต้องหรือไม่ ซึ่งต้องไม่มีช่องว่างที่ไม่เกี่ยวข้อง
  // และมีรูปแบบของอีเมลที่ถูกต้องโดยมีอักขระ @ และจุดอยู่ในตำแหน่งที่ถูกต้องในข้อความ
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

//ทำชื่อย่อ
export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" "); 
  // console.log("แยกชื่อ",words);
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};
 