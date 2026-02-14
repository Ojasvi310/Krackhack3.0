// frontend/src/components/GlassCardPart3.jsx

const GlassCardPart3 = ({ children, className = "" }) => {
  return (
    <div
      className={`
        backdrop-blur-lg bg-white/30 border border-white/20
        shadow-lg rounded-2xl p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCardPart3;
