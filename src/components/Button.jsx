/* eslint-disable react/prop-types */

const Button = ({children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    hoverBgColor = 'bg-blue-700',
    hoverTextColor = 'text-gray-200',
    className = '',
    ...props
}) => {
  return (
    <button type={type}
    className={`px-4 py-2 rounded-lg ${bgColor} hover:${hoverBgColor} ${textColor} hover:${hoverTextColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button