import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary text-surface hover:shadow-glow font-semibold',
    secondary: 'glass hover:bg-white/20 text-light',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-surface',
    ghost: 'text-light hover:bg-white/10'
  };

  return (
    <motion.button
      className={`px-6 py-3 rounded-full transition-all duration-300 ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
