const GlassButton = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  const base = "rounded-lg transition flex items-center gap-2 justify-center";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton;