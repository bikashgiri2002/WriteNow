import logoImg from "/WriteNow.png";

// eslint-disable-next-line react/prop-types
const Logo = ({ width = "100px", height = "100px" }) => {
  return <img style={{ width, height }} src={logoImg} alt="WriteNow logo" />;
};

export default Logo;
